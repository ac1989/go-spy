const axios = require('axios');
const KEYS = require('../config/keys');
const store = require('../store');
const { transduceMatchToSchema } = require('../helpers/faceitHelpers');
const { delay, retry } = require('../helpers/promise');
const mongoose = require('mongoose');
const FaceitMatch = mongoose.model('faceitmatches');

// -------------------------------------------------------------------------- //
// CONFIG                                                                     //
// ========================================================================== //

const API_URL = `https://open.faceit.com/data/v4/`;
const OPTS = {
  headers: { Authorization: `Bearer ${KEYS.FACEIT_API_KEY}` },
  timeout: 3000
};

// -------------------------------------------------------------------------- //
// USER FETCHING                                                              //
// ========================================================================== //

module.exports.fetchUserByNicknameRequest = nickname => {
  return axios.get(`${API_URL}players?nickname=${nickname}`, OPTS);
};

module.exports.fetchUserByNickname = async nickname => {
  const res = await this.fetchUserByNicknameRequest(nickname);
  if (!res.data) throw new Error('No such Faceit user found.');
  return res.data;
};

// -------------------------------------------------------------------------- //
// MATCH FETCHING                                                             //
// ========================================================================== //

module.exports.fetchOngoingMatchesByHubIDRequest = hub_id => {
  return axios.get(`${API_URL}hubs/${hub_id}/matches`, OPTS);
};

module.exports.fetchOngoingMatchesByHubID = async hub_id => {
  let res = await retry(this.fetchOngoingMatchesByHubIDRequest, hub_id);
  if (res) return res;
};

module.exports.fetchOngoingMatchesByHubIDs = hub_ids => {
  console.log('FETCHING MATCHES ------------------------------------------ //');

  hub_ids.forEach(async hub_id => {
    const res = await this.fetchOngoingMatchesByHubID(hub_id);
    if (!res) return; // Early return.

    res.data.items.map(match => {
      FaceitMatch.findOneAndUpdate(
        { match_id: match.match_id },
        transduceMatchToSchema(match),
        { upsert: true }
      ).exec();
    });
  });
};

// -------------------------------------------------------------------------- //
// RUNNING TASKS                                                              //
// ========================================================================== //

module.exports.fetchOngoingMatchesByHubIDsTask = (hub_ids, ms) => {
  setInterval(() => this.fetchOngoingMatchesByHubIDs(hub_ids), ms);
};
