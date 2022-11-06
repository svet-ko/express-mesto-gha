const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');
const auth = require('./middlewares/auth');
require('dotenv').config();
const NotFoundError = require('./utils/errors/notFoundError');
const errorsHandler = require('./middlewares/errorsHandler');
const { validateSignUp, validateSignIn } = require('./utils/validations');
const {
  login,
  createUser,
} = require('./controllers/users');

const { PORT = 3000 } = process.env;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mestodb');
app.post('/signin', validateSignIn, login);
app.post('/signup', validateSignUp, createUser);

app.use(auth);
app.use('/users', userRoutes);
app.use('/cards', cardRoutes);
app.use('*', () => {
  throw new NotFoundError('Запрашиваемый адрес не найден');
});
app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
