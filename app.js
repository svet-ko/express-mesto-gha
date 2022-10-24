const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');
const {
  NOTFOUND_ERROR_CODE,
} = require('./utils/constants');

const { PORT = 3000 } = process.env;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use((req, res, next) => {
  req.user = {
    _id: '6352a2536a792d71c58a1def',
  };

  next();
});

app.use('/users', userRoutes);
app.use('/cards', cardRoutes);
app.use('*', (req, res) => {
  res.status(NOTFOUND_ERROR_CODE).send({
    message: 'Запрашиваемый адрес не найден. Проверьте URL и метод запроса',
  });
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
