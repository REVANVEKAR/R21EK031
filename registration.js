const axios = require('axios');

// Registration for affordmed
const registerUrl = 'http://20.244.56.144/test/register';
const registerData = {
  companyName: 'affordmed',
  ownerName: 'Revanth',
  rollNo: 'R21EK031',
  ownerEmail: '2110456@reva.edu.in',
  accessCode: 'lUZTNI'
};

axios.post(registerUrl, registerData)
  .then(response => {
    console.log('Registration Successful!');
    const credentials = response.data;
    console.log('Credentials:', credentials);

    const { companyName, clientID, clientSecret, ownerName, ownerEmail, rollNo } = credentials;

    // getting the authorization token from the server
    const authUrl = 'http://20.244.56.144/test/auth';
    const authData = {
      companyName: companyName,
      clientID: clientID,
      clientSecret: clientSecret,
      ownerName: ownerName,
      ownerEmail: ownerEmail,
      rollNo: rollNo
    };

    return axios.post(authUrl, authData);
  })
  .then(response => {
    console.log('Authorization Successful!');
    console.log('Token:', response.data);
  })
  .catch(error => {
    console.error('Error:', error.response ? error.response.data : error.message);
  });
