// backend/src/server.js

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// Validate required environment variables
const requiredEnvVars = [
  'MONGO_URI', 
  'EMAIL_SERVICE', 
  'EMAIL_USER', 
  'NOTIFICATION_EMAIL'
];

// Microsoft-specific variables are optional
const optionalEnvVars = [
  'MICROSOFT_CLIENT_ID',
  'MICROSOFT_CLIENT_SECRET',
  'MICROSOFT_TENANT_ID'
];

// Check required variables
const missingRequired = requiredEnvVars.filter(envVar => !process.env[envVar]);
if (missingRequired.length > 0) {
  console.error(`Missing required environment variables: ${missingRequired}`);
  process.exit(1);
}

// Log environment status
console.log('Environment variables:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('MONGO_URI:', process.env.MONGO_URI.replace(
  /(mongodb:\/\/[^:]+:)[^@]+(@)/,
  '$1*****$2'
));

// Log optional variable status
console.log('Optional Microsoft credentials status:');
optionalEnvVars.forEach(envVar => {
  console.log(`${envVar}: ${process.env[envVar] ? 'present' : 'missing'}`);
});

const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.SUB_ENV === 'production' 
    ? [
        'https://enticai.com',
      ]
    : process.env.SUB_ENV === 'staging'
    ? [
        'https://staging.enticai.com',
      ]
    : [
        'https://dev.enticai.com',
      ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Apply CORS before other middleware
app.use(cors(corsOptions));


// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"]
    }
  },
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: false
}));

// Request logging in development
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log('Request received:', {
      method: req.method,
      path: req.path,
      body: req.body,
      headers: req.headers
    });
    next();
  });
}

// Handle preflight requests
app.options('*', cors());

// Middleware
app.use(express.json({ limit: '12mb' }));
app.use(express.urlencoded({ extended: true, limit: '12mb' }));
app.use(cookieParser());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Routes
app.use('/api', require('./routes/api'));


// 404 handler
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(res.statusCode === 200 ? 500 : res.statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
});

// Connect to MongoDB
connectDB()
  .then(() => {
    // Start server after DB connection
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to start server:', err);
    process.exit(1);
  }); 