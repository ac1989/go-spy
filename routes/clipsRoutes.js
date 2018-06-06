const clips_controller = require('../controllers/clipsController');

module.exports = app => {
  app.get('/api/clips', clips_controller.get);
};
