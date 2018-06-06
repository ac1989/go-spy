const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const axios = require('axios');
const keys = require('./config/keys');
const hubs = require('./config/hubs');
const app = express();
require('./models/playerModel');
require('./models/faceitMatchModel');
require('./models/twitchClipsModel');
const twitch = require('./services/twitch');
const faceit = require('./services/faceit');

mongoose.connect(
  keys.mongoURI,
  err => {
    if (err) console.warn(err.message);
  }
);

app.use(morgan('combined'));

require('./routes/playersRoutes')(app);
require('./routes/matchesRoutes')(app);
require('./routes/clipsRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT || 5000, () => {
  console.log(`Server listening on port ${PORT}`);
  twitch.fetchClipsByLivePlayersTask(600000);
  twitch.refreshAllStreamsTask(30000);
  faceit.fetchOngoingMatchesByHubIDsTask(
    [
      '74caad23-077b-4ef3-8b1d-c6a2254dfa75',
      '748cf78c-be73-4eb9-b131-21552f2f8b75',
      'fd5780d5-dd2f-4479-906c-57b8e41ae9d7',
      'b6895a52-a70c-41d6-b096-7d05377720c4',
      '1a55d9f7-898c-4424-b1da-e711366e9902',
      '11263f68-117f-4e5a-8b6b-b0545cb6e7cf'
    ],
    15000
  );
});
