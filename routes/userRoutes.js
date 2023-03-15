const express = require('express');
const {
  signup,
  signin,
  getUser,
  getUserall,
  updateAccount,
  deleteUser,
} = require('../controllers/usercontroller');
const { verifyAdmin, verifyUser } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/getuser/:id', getUser);
router.get('/getallusers', getUserall);
router.patch('/editUser/:id', verifyUser, updateAccount);
router.delete('/delete/:id', verifyUser, deleteUser);

module.exports = router;
