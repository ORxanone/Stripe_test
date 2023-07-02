require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const router = express.Router();
const creditController = require('./creditController');

const app = express();
app.use(express.json());

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.post('/create-customer', creditController.createCustomer);
router.post('/add-card', creditController.addNewCard);
router.post('/create-charges', creditController.createCharges);






module.exports = router;


