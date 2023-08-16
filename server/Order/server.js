const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const orderRoutes = require('./routes/orderRoutes');
const mongoose = require('mongoose');

// middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/orders', orderRoutes);

// MongoDB Connect
mongoose.connection(process.env.MONGO_URL)
    .then(() => {
        console.log('Connected to the database');
        const PORT = process.env.Order_PORT || 3003;
        app.listen(PORT, () => {
            console.log(`Order Microservice is running on http://localhost:${PORT}`)
        })
    })
    .catch((error) => {
        console.error('Database connection error:', error);
    })
