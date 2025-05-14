const express = require('express');
const { loadSecurityPolicies } = require('./utils/policyLoader');
const { securityManager } = require('./middleware/securityManager');
const testRoutes = require('./routes/testRoutes');

const app = express();
const policies = loadSecurityPolicies();

app.use(express.json());

// Apply centralized security middleware
const securityMiddleware = securityManager(policies);
securityMiddleware.forEach(mw => app.use(mw));

// Register routes
app.use('/api', testRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Secure server running on port ${PORT}`);
});