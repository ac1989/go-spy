const axios = require('axios');
const KEYS = require('../config/keys');
const { delay } = require('../helpers/promise');
const mongoose = require('mongoose');
const Player = mongoose.model('players');
const TwitchClip = mongoose.model('twitchclips');

// -------------------------------------------------------------------------- //
// CONFIG                                                                     //
// ========================================================================== //

const API_URL = 'https://api.twitch.tv/helix/';
const OPTS = {
  headers: { 'Client-ID': KEYS.TWITCH_CLIENTID },
  timeout: 3001
};

// -------------------------------------------------------------------------- //
// USER FETCHING                                                              //
// ========================================================================== //

module.exports.fetchUserByLoginRequest = login => {
  return axios.get(`${API_URL}users?login=${login}`, OPTS);
};

module.exports.fetchUserByLogin = async login => {
  const res = await this.fetchUserByLoginRequest(login);
  if (!res.data.data[0]) throw new Error('Twitch user not found.');
  return res.data.data[0];
};

module.exports.fetchUserByIDRequest = id => {
  return axios.get(`${API_URL}users?id=${id}`, OPTS);
};

// -------------------------------------------------------------------------- //
// STREAM FETCHING                                                            //
// ========================================================================== //

module.exports.fetchAllStreamsByUserIDsRequest = ids => {
  const QUERY_STRING = ids.reduce((url, id, index) => {
    return index === 0 ? url + id : url + '&user_id=' + id;
  }, '?user_id=');

  return axios.get(`${API_URL}/streams${QUERY_STRING}`, OPTS);
};

module.exports.refreshAllStreams = async () => {
  const players = await Player.find({});
  const twitch_ids = players.map(player => player.twitch.id);
  const streams = await this.fetchAllStreamsByUserIDsRequest(twitch_ids);

  await Promise.all(
    players.map(async player => {
      const liveStream = streams.data.data.find(
        stream => stream.user_id === player.twitch.id
      );
      if (liveStream) {
        const updatedPlayer = await player.updateStream(liveStream);
        console.log(updatedPlayer.twitch.stream.title);
      } else {
        await player.updateStream({});
      }
    })
  );

  console.log('Streams Refreshed! -----------------------!');
};

// -------------------------------------------------------------------------- //
// TWITCH CLIP FETCHING                                                       //
// ========================================================================== //

module.exports.fetchClipsByBroadcasterIDRequest = broadcaster_id => {
  return axios.get(
    `${API_URL}clips?broadcaster_id=${broadcaster_id}&first=10`,
    { headers: { Accept: 'application/vnd.twitchtv.v5+json' }, ...OPTS }
  );
};

module.exports.fetchClipsByBroadcasterID = async broadcaster_id => {
  const res = await this.fetchClipsByBroadcasterIDRequest(broadcaster_id);
  if (res) return res.data.data;
};

// FIXME: v5 API, Depricated
module.exports.fetchClipsByChannelNameRequest = channel_name => {
  return axios.get(
    `https://api.twitch.tv/kraken/clips/top?channel=${channel_name}` +
      `&period=day&limit=5`,
    {
      ...OPTS,
      headers: { Accept: 'application/vnd.twitchtv.v5+json', ...OPTS.headers }
    }
  );
};

// FIXME: v5 API, Depricated
module.exports.fetchClipsByChannelName = async channel_name => {
  const res = await this.fetchClipsByChannelNameRequest(channel_name);
  if (res) return res.data.clips;
};

// FIXME: v5 API, Depricated
module.exports.fetchClipsByLivePlayers = async () => {
  const livePlayers = await Player.find({ 'twitch.stream.type': 'live' });

  for (let player of livePlayers) {
    const clips = await this.fetchClipsByChannelName(player.twitch.login_name);
    clips.forEach(async clip => {
      console.log('Upserting:', clip.slug);
      const upsertedClip = await TwitchClip.findOneAndUpdate(
        { slug: clip.slug },
        clip,
        { upsert: true, new: true }
      ).exec();
      console.log('Upserted:', upsertedClip.slug);
    });
    await delay(3000);
  }
};

// -------------------------------------------------------------------------- //
// RUNNING TASKS                                                              //
// ========================================================================== //

module.exports.fetchClipsByLivePlayersTask = ms => {
  this.fetchClipsByLivePlayers();
  setInterval(() => this.fetchClipsByLivePlayers(), ms);
};

module.exports.refreshAllStreamsTask = ms => {
  setInterval(() => this.refreshAllStreams(), ms);
};
