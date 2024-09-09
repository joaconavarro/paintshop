// server.js or app.js

const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5500;

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors()); // Enable CORS for cross-origin requests

// Endpoint to update stock
app.post('/update-stock', (req, res) => {
    const updatedItems = req.body.items;
    if (!Array.isArray(updatedItems)) {
        return res.status(400).json({ error: 'Invalid data format' });
    }

    const filePath = path.join(__dirname, 'items.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Error reading file' });

        let jsonData;
        try {
            jsonData = JSON.parse(data);
        } catch (e) {
            return res.status(500).json({ error: 'Error parsing JSON' });
        }

        jsonData.items = updatedItems;

        fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
            if (err) return res.status(500).json({ error: 'Error writing file' });
            res.status(200).json({ message: 'Stock updated successfully' });
        });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
