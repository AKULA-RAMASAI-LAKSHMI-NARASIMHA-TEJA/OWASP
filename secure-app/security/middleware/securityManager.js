import policy from '../policies/policy.config.js';

import injection from './injection.js';
import xss from './xss.js';
import auth from './auth.js';
import dataProtection from './dataProtection.js';
import accessControl from './accessControl.js';
import misconfiguration from './misconfiguration.js';
import logging from './logging.js';
import componentVulnerability from './componentVulnerability.js';
import cors from './cors.js';

export default function applySecurity(app) {
  if (policy.loggingAndMonitoring) app.use(logging);
  if (policy.securityMisconfiguration) app.use(misconfiguration);
  if (policy.xssProtection) app.use(xss);
  if (policy.injectionProtection) app.use(injection);
  if (policy.authProtection) app.use(auth);
  if (policy.sensitiveDataProtection) app.use(dataProtection);
  if (policy.accessControl) app.use(accessControl);
  if (policy.componentVulnerabilityCheck) app.use(componentVulnerability);
  if (policy.corsProtection) app.use(cors);

  console.log('Security policies applied:', policy);
}