// /security/SecurityBaseClass.js
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xssClean = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');
const csrf = require('csurf');

class SecurityBaseClass {
  applySecurity(app) {
    // OWASP 5 - Security Misconfiguration
    app.use(helmet());

    // OWASP 3 - Injection (NoSQL, XSS)
    app.use(xssClean());
    app.use(mongoSanitize());

    // OWASP 7 - Auth Failures (can be managed in routes with session/token logic)

    // OWASP 4 - Insecure Design (require secure session/cookies)
    app.set('trust proxy', 1);
    app.use(
      require('express-session')({
        secret: process.env.SESSION_SECRET || 'strong-secret',
        resave: false,
        saveUninitialized: false,
        cookie: { secure: process.env.NODE_ENV === 'production' }
      })
    );

    // OWASP 6 - Outdated Components - (logging this in logs - for dev awareness)
    console.warn("Ensure components are regularly updated");

    // OWASP 8 - Integrity Failures - check file uploads/signatures outside here

    // OWASP 2 - Crypto Failures - can be applied in services (encryption, JWT, HTTPS)

    // OWASP 10 - SSRF - validate all URLs (done in middleware)
  }

  applyRateLimit() {
    // OWASP 1 - Broken Access Control (abuse prevention)
    return rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      message: 'Too many requests, please try again later.'
    });
  }

  applyCORS() {
    // OWASP 5 - Misconfiguration (CORS restrictions)
    return cors({
      origin: ['https://yourdomain.com'],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true
    });
  }

  applyCSRF() {
    // OWASP 2 & 4 - CSRF protection
    return csrf({ cookie: true });
  }
}

module.exports = new SecurityBaseClass();
