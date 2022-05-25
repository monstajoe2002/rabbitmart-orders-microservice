require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose');
const conn = require('./mongo');
const port = 3000 || 8000
const app = express()
const ordersSchema = new mongoose.Schema({
    customer_name: String,
    customer_id: Number,
    order_date: Date
})
const Order = mongoose.model('order', ordersSchema)
//link schema to a model

//Routes using the CRUD model
app.get('/api/orders', (req, res) => {

    res.status(200).json({ msg: 'Get order' })
})
app.post('/api/orders', (req, res) => {
    conn.once('open', function () {
        

        // define Schema
        const ordersSchema = new mongoose.Schema({
            customer_name: String,
            customer_id: Number,
            order_date: Date
        })

        // compile schema to model
        const Order = mongoose.model('order', ordersSchema)

        // a document instance
        const customerOrder = new Order({ name: 'Youssef', order_date: new Date().toDateString() })
        // save model to database
        customerOrder.save(function (err, order) {
            if (err) return console.error(err);
            console.log(order.name + " saved to order collection.");
        });
        
    });
    return res.status(200).json({ msg: 'Create order' })

})
app.put('/api/orders/:id', (req, res) => {
    res.status(200).json({ msg: `Update order no.${req.params.id}` })
})

app.delete('/api/orders/:id', (req, res) => {
    res.status(200).json({ msg: `Delete order no.${req.params.id}` })
})

app.listen(port, () => console.log('Server connected successfully'))



