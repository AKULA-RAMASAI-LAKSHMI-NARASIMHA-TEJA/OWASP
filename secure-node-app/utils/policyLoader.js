const fs = require('fs');
const path = require('path');

function loadSecurityPolicies(configPath = '../config/security-policies.json') {
  try {
    const filePath = path.resolve(__dirname, configPath);
    const rawData = fs.readFileSync(filePath);
    return JSON.parse(rawData);
  } catch (err) {
    console.error('Error loading policy file:', err);
    process.exit(1);
  }
}

module.exports = { loadSecurityPolicies };