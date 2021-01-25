const express = require('express');
const router = express.Router();
const {
	register,
	login,
	getMe,
	updateDetails,
	updatePassword,
	forgotPassword,
	resetPassword
} = require('../controllers/auth');

// Wherever we use protect the User has to be logged in.
const { protect, authorized } = require('../middleware/auth'); 

router.post('/register', register);
router.post('/login', login);

router.get('/me', protect, getMe);
router.put('/details', protect, updateDetails);

router.put('/updatepassword', protect, updatePassword);
router.post('/forgotpassword', forgotPassword)
router.put('/resetpassword/:resettoken', resetPassword);

module.exports = router;