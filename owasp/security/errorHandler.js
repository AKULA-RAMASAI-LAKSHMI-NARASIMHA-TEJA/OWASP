// /security/errorHandler.js

class SecurityErrorHandler {
    handle(err, req, res, next) {
      // OWASP 3 - Injection Errors
      if (err.name === 'MongoError' || err.name === 'SyntaxError') {
        return res.status(400).json({ message: 'Bad input detected.' });
      }
  
      // OWASP 2 - Cryptographic Failures
      if (err.message.includes('Invalid token') || err.message.includes('JWT')) {
        return res.status(401).json({ message: 'Authentication token error.' });
      }
  
      // OWASP 10 - SSRF
      if (err.message.includes('Invalid external request')) {
        return res.status(400).json({ message: 'Blocked external request.' });
      }
  
      // OWASP 1 - Access Control
      if (err.status === 403) {
        return res.status(403).json({ message: 'Access Denied.' });
      }
  
      // OWASP 9 - Logging
      console.error(`[SECURITY LOG] ${new Date().toISOString()} -`, err.stack);
  
      // General fallback
      res.status(500).json({ message: 'Internal server error.' });
    }
  }
  
  module.exports = new SecurityErrorHandler();
  