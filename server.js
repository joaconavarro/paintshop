const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
app.use(cors());


// Replace with your Google Client ID
const CLIENT_ID = '425627947718-26j5n0t5t3kme55govd3n463ogolfjbo.apps.googleusercontent.com';
const adminEmail = 'pramietest@gmail.com'; // Replace with your admin email

const client = new OAuth2Client(CLIENT_ID);

app.use(bodyParser.json());

// Verify Google ID Token
async function verifyToken(idToken) {
    const ticket = await client.verifyIdToken({
        idToken,
        audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const email = payload['email'];
    return email;
}

app.post('/verify-token', async (req, res) => {
    const { idToken } = req.body;

    try {
        const email = await verifyToken(idToken);
        if (email === adminEmail) {
            res.json({ authorized: true });
        } else {
            res.json({ authorized: false });
        }
    } catch (error) {
        res.status(400).json({ error: 'Invalid token' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
