const express = require('express');
const authController  = require('../controllers/authController');

const router = express.Router();

// Sample route for authentication
router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.post('/signout', authController.signout);


// router.post('/login', (req, res) => {
//     res.json({ message: 'User login route' });
// });

module.exports = router; 