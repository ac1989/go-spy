const mongoose = require('mongoose');
const { Schema } = mongoose;

const faceitMatchSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 60 * 2
  },
  configured_at: Number,
  started_at: Number,
  match_id: String,
  game: String,
  region: String,
  competition_id: String,
  competition_name: String,
  status: String,
  maps: [String],
  teams: {
    faction1: {
      faction_id: String,
      name: String,
      leader: String,
      avatar: String,
      roster: [
        {
          _id: false,
          player_id: String,
          nickname: String,
          avatar: String
        }
      ]
    },
    faction2: {
      faction_id: String,
      name: String,
      leader: String,
      avatar: String,
      roster: [
        {
          _id: false,
          player_id: String,
          nickname: String,
          avatar: String
        }
      ]
    }
  }
});

mongoose.model('faceitmatches', faceitMatchSchema);
