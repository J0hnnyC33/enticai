// backend/utils/emailService.js

const { default: axios } = require('axios');
const { getAccessToken, emailEnabled } = require('./msalConfig');

const GRAPH_API_VERSION = 'v1.0';
const GRAPH_API_BASE_URL = 'https://graph.microsoft.com';

const sendContactNotification = async (contactData) => {
  console.log('Starting email send process...');
  
  if (!emailEnabled) {
    console.warn('Email notification skipped - email functionality is disabled');
    return null;
  }

  const { name, email, phone, subject, message } = contactData;

  try {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      console.error('Failed to get access token for email');
      return null;
    }

    console.log('Graph API Token details:', {
      tokenLength: accessToken.length,
      tokenType: 'Bearer',
      tokenPreview: `${accessToken.substring(0, 50)}...`
    });

    const emailMessage = {
      message: {
        subject: `New Contact Form Submission: ${subject}`,
        body: {
          contentType: 'HTML',
          content: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <h3>Message:</h3>
            <p>${message}</p>
          `
        },
        toRecipients: [{
          emailAddress: {
            address: process.env.NOTIFICATION_EMAIL
          }
        }]
      },
      saveToSentItems: true
    };

    console.log('Sending email via Microsoft Graph API');
    
    const response = await axios({
      method: 'POST',
      url: `${GRAPH_API_BASE_URL}/${GRAPH_API_VERSION}/users/${process.env.EMAIL_USER}/sendMail`,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      data: emailMessage,
      validateStatus: null
    });

    if (response.status !== 202 && response.status !== 200) {
      const error = new Error(`Graph API returned status ${response.status}`);
      error.response = response;
      error.name = 'GraphAPIError';
      throw error;
    }

    console.log('Email sent successfully via Graph API');
    return response.data;

  } catch (error) {
    console.error('Error sending email via Graph API:', {
      name: error.name || 'UnknownError',
      message: error.message || 'No error message',
      code: error.response?.data?.error?.code,
      statusCode: error.response?.status,
      requestId: error.response?.headers['request-id'],
      errorDetail: error.response?.data?.error,
      url: `${GRAPH_API_BASE_URL}/${GRAPH_API_VERSION}/users/${process.env.EMAIL_USER}/sendMail`
    });
    return null;
  }
};

module.exports = {
  sendContactNotification
}; 