const router = require('express').Router();
const {
  getUser,
  getSingleUser,
  createUser,
  updateUser,
  addFriend,
  deleteFriend,
  deleteUser,

} = require('../../controller/userController');




// /api/user
router.route('/').get(getUser).post(createUser);

// /api/user/:userid
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);


module.exports = router;