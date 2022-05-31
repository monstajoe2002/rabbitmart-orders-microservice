require('dotenv').config();
const express = require('express');
const { ObjectId } = require('mongodb');
const { mongoClient } = require('./mongo');
const port = 3000 || 8000
const app = express()

app.use(express.json())
//status array
const orderStatus = ['CREATED', 'PROCESSING', 'FULFILLED', 'CANCELED']
//Routes using the CRUD model
app.get('/api/orders/:id', async (req, res) => {
    const db = await mongoClient();
    if (!db) res.status(500).send('Systems Unavailable');
    const allData = await db.collection('orders').findOne({_id:ObjectId(`${req.params.id}`)})
    
    res.status(200).json({ msg: 'Get order',allData })
})
app.get('/api/orders', async (req, res) => {
    const db = await mongoClient();
    if (!db) res.status(500).send('Systems Unavailable');
    const allData = await db.collection('orders').find().toArray();

    res.status(200).json({ msg: 'Get order', allData })
})
app.post('/api/orders', async(req, res) => {
    const order=req.body;
    const db = await mongoClient();
    if (!db) res.status(500).send('Systems Unavailable');
    await db.collection('orders').insertOne(order)
    res.status(200).json(order)

})
app.put('/api/orders/:id',async (req, res) => {
    const db = await mongoClient();
    if (!db) res.status(500).send('Systems Unavailable');
    await db.collection('orders').updateOne({ _id: ObjectId(`${req.params.id}`) }, { $set: { status: orderStatus[1]}})
    res.status(200).json({ msg: `Update order no.${req.params.id}` })
})

app.delete('/api/orders/:id',async (req, res) => {
    const db = await mongoClient();
    if (!db) res.status(500).send('Systems Unavailable');
    await db.collection('orders').deleteOne({ _id: ObjectId(`${req.params.id}`)})
    res.status(200).json({ msg: `Delete order no.${req.params.id}` })
})

app.listen(port, () => console.log('Server connected successfully'))



