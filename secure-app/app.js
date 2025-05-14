import express from 'express';
import applySecurity from './security/middleware/securityManager.js';

const app = express();
app.use(express.json());

// Apply security policies
applySecurity(app);

// Routes
app.get('/', (req, res) => {
  res.send('Secure App Running!');
});

app.listen(3000, () => console.log('Server is running on port 3000'));