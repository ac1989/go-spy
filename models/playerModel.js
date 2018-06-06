const mongoose = require('mongoose');
const { Schema } = mongoose;

const playerSchema = new Schema({
  faceit: {
    nickname: String,
    id: String
  },
  twitch: {
    login_name: String,
    id: String,
    stream: {
      type: { type: String },
      title: String,
      viewer_count: Number,
      started_at: String,
      thumbnail_url: String
    }
  }
});

playerSchema.methods.updateStream = function(streamData) {
  const { type, title, viewer_count, started_at, thumbnail_url } = streamData;
  this.twitch.stream = {
    type,
    title,
    viewer_count,
    started_at,
    thumbnail_url
  };
  return this.save();
};

mongoose.model('players', playerSchema);
