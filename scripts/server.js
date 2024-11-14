const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());

app.get('/fetch-image', async (req, res) => {
    const url = req.query.url; // URL страницы с логотипом
    try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);

        let logoLink = $('p em a');
        let imageUrl = logoLink.attr('href');

        if (!imageUrl) {
            console.log("First selector didn't find the image. Trying the second selector.");
            logoLink = $('p a');
            imageUrl = logoLink.attr('href');
        }

        if (imageUrl) {
            console.log("Image URL found:", imageUrl);
            res.json({ imageUrl });
        } else {
            console.error('Image link not found on the page');
            res.status(404).json({ error: 'Image link not found on the page' });
        }
    } catch (error) {
        console.error('Error fetching the page:', error.message);
        res.status(500).json({ error: 'Error fetching the image URL' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});