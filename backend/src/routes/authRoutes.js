const express = require('express');
const { signIn, signUp, check, logout } = require('../controllers/authController');
const alreadyLoggedIn = require('../middlewares/alreadyLoggedIn');
const protectRoute = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/sign-up', alreadyLoggedIn, signUp);

router.post('/sign-in', alreadyLoggedIn, signIn);

router.get('/check', protectRoute, check);

router.post('/logout', logout)

module.exports = router;
