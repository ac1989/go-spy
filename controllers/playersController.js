const bcrypt = require('bcrypt');
const { HASH } = require('../config/keys');
const axios = require('axios');
const mongoose = require('mongoose');
const Player = mongoose.model('players');
const twitch = require('../services/twitch');
const faceit = require('../services/faceit');

const filtersFromQuery = queries => {
  return Object.keys(queries).reduce((mongooseQuery, query) => {
    switch (query) {
      case 'twitch_id':
        Array.isArray(query)
          ? (mongooseQuery['twitch.id'] = { $in: queries[query] })
          : (mongooseQuery['twitch.id'] = queries[query]);
        break;
      case 'stream':
        mongooseQuery['twitch.stream.type'] = queries[query];
        break;
    }
    return mongooseQuery;
  }, {});
};

module.exports.get = async (req, res, next) => {
  let players = await Player.find(filtersFromQuery(req.query));
  res.send(players);
};

module.exports.createPlayerFromNames = async (req, res, next) => {
  const password = req.headers.authorization;
  let authed = false;

  await bcrypt.compare(password, HASH).then(auth => {
    authed = auth;
  });

  if (!authed) {
    res.send({ Error: 'You are not me!' });
    return;
  }

  const { twitch_login, faceit_nickname } = req.query;

  if (!twitch_login || !faceit_nickname) {
    res.send({ Error: 'Missing either twitch_login or faceit_nickname.' });
    return;
  }

  try {
    const existingPlayer = await Player.findOne({
      'twitch.login_name': twitch_login
    });

    if (existingPlayer) {
      res.send({ player: existingPlayer });
      return;
    }

    const [twitchUserData, faceitUserData] = await axios.all([
      twitch.fetchUserByLogin(twitch_login),
      faceit.fetchUserByNickname(faceit_nickname)
    ]);

    const savedPlayer = await Player.create({
      faceit: {
        nickname: faceitUserData.nickname,
        id: faceitUserData.player_id
      },
      twitch: {
        login_name: twitchUserData.login,
        id: twitchUserData.id
      }
    });

    res.send(savedPlayer);
  } catch (err) {
    res.send({ Error: err.message });
  }
};
