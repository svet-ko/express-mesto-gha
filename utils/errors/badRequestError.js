const { INCORRECT_DATA_ERROR_CODE } = require('../constants');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = INCORRECT_DATA_ERROR_CODE;
  }
}
module.exports = BadRequestError;
