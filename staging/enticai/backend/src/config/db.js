// backend/src/config/db.js

const fs = require('fs');
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('Environment variables:');
    console.log('DB_NAME:', process.env.DB_NAME);
    console.log('MONGO_INITDB_ROOT_USERNAME:', process.env.MONGO_INITDB_ROOT_USERNAME);
    console.log('MONGO_URI:', process.env.MONGO_URI?.replace(
      /(mongodb:\/\/[^:]+:)[^@]+(@)/,
      '$1*****$2'
    ));
    
    // Test file access
    try {
      const certExists = fs.existsSync('/etc/ssl/mongo/ca.pem');
      console.log('CA certificate exists:', certExists);
      const certContent = fs.readFileSync('/etc/ssl/mongo/ca.pem', 'utf8');
      console.log('CA certificate loaded, length:', certContent.length);
    } catch (certError) {
      console.error('Error accessing certificate:', certError);
    }

    await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME,
      tls: true,
      tlsCAFile: '/etc/ssl/mongo/ca.pem',
      tlsAllowInvalidCertificates: false,
    });

    console.log('MongoDB Connected Successfully');

  } catch (err) {
    console.error('MongoDB connection error:', err);
    console.error('Error details:', {
      name: err.name,
      message: err.message,
      code: err.code,
      stack: err.stack
    });
    throw err; // Let server.js handle the error
  }
};

module.exports = connectDB; 