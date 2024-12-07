const {OAuth2Client} = require('google-auth-library');
const express = require('express');
const app = express();
const client = new OAuth2Client("672903744712-5s97ekr693ere7g2vk7c89jc9cacvugt.apps.googleusercontent.com");

app.use(express.json());

app.post('/callback', async (req, res) => {
    const token = req.body.token;
    
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: "672903744712-5s97ekr693ere7g2vk7c89jc9cacvugt.apps.googleusercontent.com"
        });
        const payload = ticket.getPayload();
        console.log('User authenticated:', payload);
        res.json({status: 'success', user: payload});
    } catch (error) {
        console.error('Error during authentication:', error);
        res.status(400).json({status: 'error', message: 'Authentication failed'});
    }
});

app.listen(5500, () => {
    console.log('Server is running on http://localhost:5500');
});
