const router = require('express').Router();
const { validateSignUp, validateSignIn } = require('../utils/validations');
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const auth = require('../middlewares/auth');
const NotFoundError = require('../utils/errors/notFoundError');
const {
  login,
  createUser,
} = require('../controllers/users');

router.post('/signin', validateSignIn, login);
router.post('/signup', validateSignUp, createUser);

router.use(auth);
router.use('/users', userRoutes);
router.use('/cards', cardRoutes);
router.use('*', () => {
  throw new NotFoundError('Запрашиваемый адрес не найден');
});

module.exports = router;
