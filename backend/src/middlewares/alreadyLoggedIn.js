const jwt = require('jsonwebtoken');

const alreadyLoggedIn = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer')) {
    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      return res.status(302).json({
        message: 'You are already logged in.',
        redirectUrl: '/dashboard', // you can customize this
      });
    } catch (error) {
      return next();
    }
  } else {
    return next();
  }
};

module.exports = alreadyLoggedIn;
