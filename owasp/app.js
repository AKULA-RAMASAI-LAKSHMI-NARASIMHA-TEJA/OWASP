// app.js
const express = require('express');
const cookieParser = require('cookie-parser');
const SecurityBase = require('./security/SecurityBaseClass');
const ErrorHandler = require('./security/errorHandler');
const { validateSSRF } = require('./middleware/securityMiddleware');

const app = express();

app.use(express.json());
app.use(cookieParser());

SecurityBase.applySecurity(app);
app.use(SecurityBase.applyRateLimit());
app.use(SecurityBase.applyCORS());
app.use(SecurityBase.applyCSRF());

// Example SSRF protected endpoint
app.post('/fetch-url', validateSSRF, (req, res) => {
  // safe request logic here
  res.send('URL fetch allowed');
});

// Error Handler
app.use((err, req, res, next) => ErrorHandler.handle(err, req, res, next));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
