const players_controller = require('../controllers/playersController');

module.exports = app => {
  app.get('/api/players', players_controller.get);
  app.post('/api/players', players_controller.createPlayerFromNames);
};
