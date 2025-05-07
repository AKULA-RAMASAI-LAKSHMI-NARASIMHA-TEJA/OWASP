// /middleware/securityMiddleware.js
const url = require('url');

const validateSSRF = (req, res, next) => {
  const targetUrl = req.body.url || '';
  const parsed = url.parse(targetUrl);

  if (
    ['localhost', '127.0.0.1'].includes(parsed.hostname) ||
    parsed.hostname.endsWith('.internal')
  ) {
    const err = new Error('Invalid external request');
    return next(err);
  }
  next();
};

const checkRole = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== requiredRole) {
      return res.status(403).json({ message: 'Access denied.' });
    }
    next();
  };
};

module.exports = {
  validateSSRF,
  checkRole
};
