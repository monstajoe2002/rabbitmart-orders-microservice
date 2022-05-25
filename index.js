require('dotenv').config();
const express = require('express');
const mongoose=require('mongoose');
const { mongoClient } = require('./mongo');
const port = 3000 || 8000
const app = express()

const ordersSchema = new mongoose.Schema({
    name: String,
    order_date: Date
})
const Order=mongoose.model('orders',ordersSchema )
//test using a document
const order=new Order({name:'Slim',order_date:new Date()})
//Routes using the CRUD model
app.get('/api/orders', async (req, res) => {
    const db = await mongoClient();
    if (!db) res.status(500).send('Systems Unavailable');
    const allData=await db.collection('orders').find()
    res.status(200).json({ msg: 'Get order',allData })
})
app.post('/api/orders', async(req, res) => {
    
    const db = await mongoClient();
    if (!db) res.status(500).send('Systems Unavailable');
    await db.collection('orders').insertOne(order)
    res.status(200).json(order)

})
app.put('/api/orders/:id',async (req, res) => {
    const db = await mongoClient();
    if (!db) res.status(500).send('Systems Unavailable');
    await db.collection('orders').updateOne({name:'Slim'},{$set:{name:'balabizo'}})
    res.status(200).json({ msg: `Update order no.${req.params.id}` })
})

app.delete('/api/orders/:id',async (req, res) => {
    const db = await mongoClient();
    if (!db) res.status(500).send('Systems Unavailable');
    await db.collection('orders').deleteOne({name:'balabizo'})
    res.status(200).json({ msg: `Delete order no.${req.params.id}` })
})

app.listen(port, () => console.log('Server connected successfully'))



