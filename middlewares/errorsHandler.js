const { SERVER_ERROR_CODE } = require('../utils/constants');

module.exports = (error, req, res, next) => {
  const { statusCode = SERVER_ERROR_CODE, message } = error;

  res.status(statusCode).send({
    message: statusCode === SERVER_ERROR_CODE ? 'На сервере произошла ошибка' : message,
  });
  next();
};
