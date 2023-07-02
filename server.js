require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const router = express.Router();


const creditRouter = require('./creditRouter');


const app = express();
app.use(express.json());

app.use('/', creditRouter);


app.listen(8080, (
    console.log("Connected")
))

