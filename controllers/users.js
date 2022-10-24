const mongoose = require('mongoose');
const User = require('../models/user');
const {
  INCORRECT_DATA_ERROR_CODE,
  NOTFOUND_ERROR_CODE,
  SERVER_ERROR_CODE,
} = require('../utils/constants');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(SERVER_ERROR_CODE).send({ message: 'На сервере произошла ошибка' }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id).orFail()
    .then((user) => res.send({ data: user }))
    .catch((e) => {
      if (e instanceof mongoose.Error.CastError) {
        res.status(INCORRECT_DATA_ERROR_CODE).send({ message: 'Некорректный идентификатор пользователя' });
        return;
      }
      if (e instanceof mongoose.Error.DocumentNotFoundError) {
        res.status(NOTFOUND_ERROR_CODE).send({ message: 'Пользователь по указанному идентификатору не найден' });
        return;
      }
      res.status(SERVER_ERROR_CODE).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((e) => {
      if (e instanceof mongoose.Error.ValidationError) {
        res.status(INCORRECT_DATA_ERROR_CODE).send({ message: 'Некорректные данные имени, статуса или ссылки на аватар' });
        return;
      }
      res.status(SERVER_ERROR_CODE).send({ message: 'На сервере произошла ошибка. Не удалось создать пользователя' });
    });
};

module.exports.updateUserProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true }).orFail()
    .then((user) => res.send({ data: user }))
    .catch((e) => {
      if (e instanceof mongoose.Error.ValidationError || e instanceof mongoose.Error.CastError) {
        res.status(INCORRECT_DATA_ERROR_CODE).send({ message: 'Некорректные данные полей имени или статуса' });
        return;
      }
      if (e instanceof mongoose.Error.DocumentNotFoundError) {
        res.status(NOTFOUND_ERROR_CODE).send({ message: 'Пользователь по указанному идентификатору не найден' });
        return;
      }
      res.status(SERVER_ERROR_CODE).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true }).orFail()
    .then((user) => res.send({ data: user }))
    .catch((e) => {
      if (e instanceof mongoose.Error.ValidationError || e instanceof mongoose.Error.CastError) {
        res.status(INCORRECT_DATA_ERROR_CODE).send({ message: 'Некорректные данные ссылки на аватар' });
        return;
      }
      if (e instanceof mongoose.Error.DocumentNotFoundError) {
        res.status(NOTFOUND_ERROR_CODE).send({ message: 'Пользователь по указанному идентификатору не найден' });
        return;
      }
      res.status(SERVER_ERROR_CODE).send({ message: 'На сервере произошла ошибка' });
    });
};
