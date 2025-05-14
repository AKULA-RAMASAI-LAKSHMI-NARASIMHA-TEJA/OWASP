const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const xssClean = require('xss-clean');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');

function securityManager(policies) {
  const middleware = [];

  if (policies.secureHeaders) {
    middleware.push(helmet());
  }

  if (policies.contentSecurityPolicy) {
    middleware.push(helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
      }
    }));
  }

  if (policies.xssProtection) {
    middleware.push(xssClean());
  }

  if (policies.noSQLInjectionSanitize) {
    middleware.push(mongoSanitize());
  }

  if (policies.sqlInjectionSanitize) {
    middleware.push((req, res, next) => {
      ['body', 'query', 'params'].forEach(location => {
        if (req[location]) {
          for (let key in req[location]) {
            req[location][key] = String(req[location][key]).replace(/(['";])/g, '');
          }
        }
      });
      next();
    });
  }

  if (policies.httpParameterPollutionPrevention) {
    middleware.push(hpp());
  }

  if (policies.rateLimit) {
    middleware.push(rateLimit({
      windowMs: policies.rateLimit.windowMs,
      max: policies.rateLimit.max
    }));
  }

  if (policies.cors && policies.cors.enabled) {
    middleware.push(cors({
      origin: policies.cors.origin,
      optionsSuccessStatus: 200
    }));
  }

  return middleware;
}

module.exports = { securityManager };