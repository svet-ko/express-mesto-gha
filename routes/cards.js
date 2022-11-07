const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const {
  validateCardCreation,
  validateCardId,
} = require('../utils/validations');

router.get('/', getCards);
router.post('/', validateCardCreation, createCard);
router.delete('/:cardId', validateCardId, deleteCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
