require('dotenv').config();
const express = require('express');
const axios = require('axios');
const { mongoClient } = require('./mongo');

const app = express();

app.get('/', async (req, res) => {
    const db = await mongoClient();
    if (!db) res.status(500).send('Systems Unavailable');

    
    await db.collection('orders').insertOne(data);

    return res.send(data);
});

app.listen(3000);
