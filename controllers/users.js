const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../utils/errors/notFoundError');
const BadRequestError = require('../utils/errors/badRequestError');
const ConflictError = require('../utils/errors/conflictError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((e) => next(e));
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.id).orFail()
    .then((user) => res.send({ data: user }))
    .catch((e) => {
      if (e instanceof mongoose.Error.CastError) {
        next(new BadRequestError('Некорректный идентификатор пользователя'));
        return;
      }
      if (e instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError('Пользователь по указанному идентификатору не найден'));
        return;
      }
      next(e);
    });
};

module.exports.createUser = async (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      const { password: p, ...data } = JSON.parse(JSON.stringify(user));
      res.send({ data });
    })
    .catch((e) => {
      if (e instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Некорректные данные имени, статуса или ссылки на аватар'));
        return;
      }
      if (e.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже существует'));
        return;
      }
      next(e);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((e) => {
      next(e);
    });
};

module.exports.updateUserProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true }).orFail()
    .then((user) => res.send({ data: user }))
    .catch((e) => {
      if (e instanceof mongoose.Error.ValidationError || e instanceof mongoose.Error.CastError) {
        next(new BadRequestError('Некорректные данные полей имени или статуса'));
        return;
      }
      if (e instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError('Пользователь по указанному идентификатору не найден'));
        return;
      }
      next(e);
    });
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true }).orFail()
    .then((user) => res.send({ data: user }))
    .catch((e) => {
      if (e instanceof mongoose.Error.ValidationError || e instanceof mongoose.Error.CastError) {
        next(new BadRequestError('Некорректные данные ссылки на аватар'));
        return;
      }
      if (e instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError('Пользователь по указанному идентификатору не найден'));
        return;
      }
      next(e);
    });
};

module.exports.getMe = (req, res, next) => {
  User.findOne({ _id: req.user._id })
    .then((user) => res.send(user))
    .catch((e) => next(e));
};
