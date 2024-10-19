const express = require('express');
const fetch = require('node-fetch');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const TELEGRAM_API_URL = 'https://api.telegram.org/bot7524489456:AAFE3tsi869upqv40cXaPc9Sk3_wlZrPk0Y/sendMessage';
const CHAT_ID = '6341203079';

app.post('/send-data', (req, res) => {
    const { surname, name, phone, telegram } = req.body;

    const message = `
        Замовлення від:
        Прізвище: ${surname}
        Ім'я: ${name}
        Номер телефону: ${phone}
        Telegram: @${telegram}
    `;

    fetch(TELEGRAM_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            res.json({ success: true });
        } else {
            res.status(500).json({ error: 'Failed to send message' });
        }
    })
    .catch(error => {
        res.status(500).json({ error: error.message });
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

