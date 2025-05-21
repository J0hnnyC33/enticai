// backend/src/routes/api.js

const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const contactController = require('../controllers/contactController');
const chatController = require('../controllers/chatController');

// Rate limiter for chat endpoints
const chatLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50,
    message: { error: 'Too many requests, please try again after 15 minutes' },
});

// Contact routes
router.post('/contact', contactController.submitContact);

// Chat routes
router.post('/chat', chatLimiter, chatController.sendMessage);
router.post('/chat/reset', chatLimiter, chatController.resetConversation);
router.get('/health', chatController.getHealth);

module.exports = router; 