const express = require('express');
const { signIn, signUp, check } = require('../controllers/authController');
const alreadyLoggedIn = require('../middlewares/alreadyLoggedIn');

const router = express.Router();

router.post('/sign-up', alreadyLoggedIn, signUp);

router.post('/sign-in', alreadyLoggedIn, signIn);

router.post('/check', alreadyLoggedIn, check);

module.exports = router;
