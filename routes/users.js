const router = require('express').Router();
const {
  getUsers,
  getUserById,
  updateUserProfile,
  updateUserAvatar,
  getMe,
} = require('../controllers/users');
const {
  validateUserId,
  validateProfileUpdate,
  validateAvatarUpdate,
} = require('../utils/validations');

router.get('/', getUsers);
router.get('/me', getMe);
router.get('/:id', validateUserId, getUserById);
router.patch('/me', validateProfileUpdate, updateUserProfile);
router.patch('/me/avatar', validateAvatarUpdate, updateUserAvatar);

module.exports = router;
