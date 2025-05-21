// backend/src/utils/msalConfig.js

const { ConfidentialClientApplication } = require('@azure/msal-node');

// Required environment variables for MSAL
const requiredVars = [
  'MICROSOFT_CLIENT_ID',
  'MICROSOFT_CLIENT_SECRET',
  'MICROSOFT_TENANT_ID'
];

// Check for missing variables
const missing = requiredVars.filter(key => {
  const value = process.env[key];
  console.log(`Checking ${key}:`, {
    exists: !!value,
    value: value ? `${value.substring(0, 5)}...` : 'missing',
    length: value ? value.length : 0,
    hasWhitespace: value ? /\s/.test(value) : false
  });
  return !value || value.trim() === '';
});

let msalClient = null;
let emailEnabled = true;

if (missing.length > 0) {
  console.warn('Missing Microsoft credentials - email functionality will be disabled:', missing);
  console.warn('Available environment variables:', {
    clientId: process.env.MICROSOFT_CLIENT_ID ? `${process.env.MICROSOFT_CLIENT_ID.substring(0, 5)}...` : 'missing',
    clientSecret: process.env.MICROSOFT_CLIENT_SECRET ? `${process.env.MICROSOFT_CLIENT_SECRET.substring(0, 5)}...` : 'missing',
    tenantId: process.env.MICROSOFT_TENANT_ID ? `${process.env.MICROSOFT_TENANT_ID.substring(0, 5)}...` : 'missing'
  });
  emailEnabled = false;
} else {
  const msalConfig = {
    auth: {
      clientId: process.env.MICROSOFT_CLIENT_ID.trim(),
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET.trim(),
      authority: `https://login.microsoftonline.com/${process.env.MICROSOFT_TENANT_ID.trim()}`
    }
  };
  console.log('MSAL Config created with:', {
    clientIdLength: msalConfig.auth.clientId.length,
    clientSecretLength: msalConfig.auth.clientSecret.length,
    authority: msalConfig.auth.authority
  });
  msalClient = new ConfidentialClientApplication(msalConfig);
}

async function getAccessToken() {
  if (!emailEnabled || !msalClient) {
    console.warn('Email functionality is disabled or MSAL client not initialized');
    return null;
  }

  try {
    console.log('Attempting to acquire token for Microsoft Graph...');
    const result = await msalClient.acquireTokenByClientCredential({
      scopes: ['https://graph.microsoft.com/.default']
    });
    
    const tokenParts = result.accessToken.split('.');
    const tokenPayload = JSON.parse(Buffer.from(tokenParts[1], 'base64').toString());
    
    console.log('Graph API Token details:', {
      tokenLength: result.accessToken.length,
      tokenType: result.tokenType || 'Bearer',
      scopes: tokenPayload.scp || tokenPayload.scope || [],
      roles: tokenPayload.roles || [],
      appid: tokenPayload.appid,
      aud: tokenPayload.aud,
      exp: new Date(tokenPayload.exp * 1000).toISOString(),
      iss: tokenPayload.iss,
      permissions: tokenPayload.roles || [],
      tokenPreview: `${result.accessToken.substring(0, 50)}...`
    });
    
    return result.accessToken;
  } catch (error) {
    console.error('Error getting Graph API token:', {
      name: error.name,
      message: error.message,
      errorCode: error.errorCode,
      subError: error.subError,
      correlationId: error.correlationId
    });
    return null;
  }
}

module.exports = { 
  getAccessToken,
  emailEnabled 
}; 