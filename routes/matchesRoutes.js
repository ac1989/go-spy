const matches_controller = require('../controllers/matchesController');

module.exports = app => {
  app.get('/api/matches', matches_controller.get);
};
