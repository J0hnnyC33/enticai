// backend/src/controllers/contactController.js

const Contact = require('../models/Contact');
const { sendContactNotification } = require('../utils/emailService');

const submitContact = async (req, res) => {
  try {
    const contactData = req.body;
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'subject', 'message'];
    const missingFields = requiredFields.filter(field => !contactData[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    // Create and save contact record
    const contact = new Contact(contactData);
    await contact.save();
    console.log('Contact saved to database:', contact);

    // Send email notification
    const result = await sendContactNotification(contactData);
    
    if (result === null) {
      return res.status(500).json({
        message: 'Failed to send contact notification'
      });
    }

    res.json({
      message: 'Contact form submitted successfully',
      success: true,
      contact: contact
    });

  } catch (error) {
    console.error('Contact submission error:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    
    res.status(500).json({
      message: 'Error processing contact submission',
      success: false
    });
  }
};

module.exports = {
  submitContact
};

