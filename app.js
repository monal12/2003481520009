const express = require('express');
const axios = require('axios');
const app = express();
const port = 3100;

app.get('/numbers', async (req, res) => {
    const urls = req.query.url; 
    console.log(urls);
    if (!urls) {
        res.status(400).json({ error: 'No URLs provided' });
        return;
    }
    await axios.get(urls).then(response =>{
        const urlArray=response.data.numbers;
        console.log(urlArray)
    const results = [];
    for (const url of urlArray) {
        try {
                results.push(url);
        } catch (error) {
            console.error(`Error fetching data from ${url}: ${error.message}`);
        }
    }
    res.json({ Numbers: results });
    }).catch(error =>{
        console.error('Error',error);
    })
});
app.listen(port, () => {
    console.log(`number-management-service is running on port ${port}`);
});