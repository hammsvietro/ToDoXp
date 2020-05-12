const { Router } = require('express');

const UserController = require('./controllers/UserController');
const TodoController = require('./controllers/TodoController');
const SessionController = require('./controllers/SessionController');

const routes = Router();

const { checkToken, checkId } = require('./middlewares/authentication');

routes.get('/', (req, res) => res.send('Hello World'));

routes.post('/login', SessionController.authenticate);

routes.post('/user', UserController.create);

routes.get('/user/:userId', UserController.get);

routes.put('/user/:userId', checkToken, checkId, UserController.changePassword);

routes.post('/user/:userId/todo', checkToken, checkId, TodoController.create);

routes.get('/user/:userId/todo', checkToken, checkId, TodoController.index);

routes.put('/user/:userId/todo/:todoId', checkToken, checkId, TodoController.markAsDone);

module.exports = routes;
