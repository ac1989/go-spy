const mongoose = require('mongoose');
const TwitchClips = mongoose.model('twitchclips');

module.exports.get = async (req, res, next) => {
  const clips = await TwitchClips.find({})
    .limit(20)
    .sort({ views: 'desc' });
  res.send(clips);
};
