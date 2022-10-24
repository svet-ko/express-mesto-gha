const mongoose = require('mongoose');
const Card = require('../models/card');
const {
  INCORRECT_DATA_ERROR_CODE,
  NOTFOUND_ERROR_CODE,
  SERVER_ERROR_CODE,
} = require('../utils/constants');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(SERVER_ERROR_CODE).send({ message: 'На сервере произошла ошибка' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.send({
        data: card,
      });
    })
    .catch((e) => {
      if (e instanceof mongoose.Error.ValidationError) {
        res.status(INCORRECT_DATA_ERROR_CODE).send({ message: 'Некорректные данные названия или ссылки на изображение' });
        return;
      }
      res.status(SERVER_ERROR_CODE).send({ message: 'На сервере произошла ошибка. Не удалось создать карточку' });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId).orFail()
    .then((card) => res.send({ data: card }))
    .catch((e) => {
      if (e instanceof mongoose.Error.CastError) {
        res.status(INCORRECT_DATA_ERROR_CODE).send({ message: 'Некорректный идентификатор карточки' });
        return;
      }
      if (e instanceof mongoose.Error.DocumentNotFoundError) {
        res.status(NOTFOUND_ERROR_CODE).send({ message: 'Карточка с указанным идентификатором не найдена' });
        return;
      }
      res.status(SERVER_ERROR_CODE).send({ message: 'На сервере произошла ошибка. Карточку не удалось удалить' });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
  ).orFail()
    .then((card) => res.send({ data: card }))
    .catch((e) => {
      if (e instanceof mongoose.Error.CastError) {
        res.status(INCORRECT_DATA_ERROR_CODE).send({ message: 'Некорректный идентификатор карточки' });
        return;
      }
      if (e instanceof mongoose.Error.DocumentNotFoundError) {
        res.status(NOTFOUND_ERROR_CODE).send({ message: 'Карточка с указанным идентификатором не найдена' });
        return;
      }
      res.status(SERVER_ERROR_CODE).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
  ).orFail()
    .then((card) => res.send({ data: card }))
    .catch((e) => {
      if (e instanceof mongoose.Error.CastError) {
        res.status(INCORRECT_DATA_ERROR_CODE).send({ message: 'Некорректный идентификатор карточки' });
        return;
      }
      if (e instanceof mongoose.Error.DocumentNotFoundError) {
        res.status(NOTFOUND_ERROR_CODE).send({ message: 'Карточка с указанным идентификатором не найдена' });
        return;
      }
      res.status(SERVER_ERROR_CODE).send({ message: 'На сервере произошла ошибка' });
    });
};
