require('dotenv').config();

const code = process.env.CODE

const tokenUrl = `https://${process.env.SALESFORCE_DOMAIN || 'login'}.salesforce.com/services/oauth2/token`;

const params = new URLSearchParams({
  grant_type: 'authorization_code',
  code: code,
  client_id: process.env.SALESFORCE_CLIENT_ID,
  client_secret: process.env.SALESFORCE_CLIENT_SECRET,
  redirect_uri: process.env.SALESFORCE_REDIRECT_URI,
});

fetch(tokenUrl, {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: params,
})
  .then(res => res.json())
  .then(tokens => {
    console.log('✓ Got tokens!');
    console.log(JSON.stringify(tokens, null, 2));
    console.log('\nNow set these in your Next.js app using the manual input page.');
  })
  .catch(err => {
    console.error('✗ Error:', err);
  });