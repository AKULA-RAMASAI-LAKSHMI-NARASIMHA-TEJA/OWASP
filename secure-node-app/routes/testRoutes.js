const express = require('express');
const router = express.Router();
const { testGet, testPost } = require('../controllers/testController');

router.get('/test', testGet);
router.post('/test', testPost);

module.exports = router;