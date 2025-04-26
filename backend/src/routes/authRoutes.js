const express = require('express');
const { signIn, signUp } = require('../controllers/authController');

const router = express.Router();

router.post('/sign-up', signUp);

router.post('/sign-in', signIn);

module.exports = router;
