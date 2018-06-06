const mongoose = require('mongoose');
const { Schema } = mongoose;

// FIXME: v5 API, Depricated

const twitchClipSchema = new Schema({
  createdAt: { type: Date, default: Date.now(), expires: 60 * 18 },
  slug: String,
  tracking_id: String,
  url: String,
  embed_url: String,
  embed_html: String,
  broadcaster: {
    id: String,
    name: String,
    display_name: String,
    channel_url: String,
    logo: String
  },
  curator: {
    id: String,
    name: String,
    display_name: String,
    channel_url: String,
    logo: String
  },
  vod: {
    id: String,
    url: String
  },
  game: String,
  language: String,
  title: String,
  views: Number,
  duration: Number,
  created_at: String,
  thumbnails: {
    medium: String,
    small: String,
    tiny: String
  }
});
// const twitchClipSchema = new Schema({
//   createdAt: { type: Date, default: Date.now(), expires: 60 * 24 * 7 },
//   id: String,
//   url: String,
//   embed_url: String,
//   broadcaster_id: String,
//   creator_id: String,
//   video_id: String,
//   game_id: String,
//   language: String,
//   title: String,
//   view_count: Number,
//   created_at: String,
//   thumbnail_url: String
// });

mongoose.model('twitchclips', twitchClipSchema);
