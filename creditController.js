require("dotenv").config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);



const createCustomer = async (req, res, next) => {
    try {
        const customer = await stripe.customers.create({
            name: req.body.name,
            email: req.body.email,
        });
        res.status(200).send(customer);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const addNewCard = async (req, res, next) => {
    try {
        const {
            customer_id,
            card_Name,
            card_ExpYear,
            card_ExpMonth,
            card_Number,
            card_CVC,
        } = req.body;

        // const card_token = await stripe.tokens.create({
        //     card: {
        //         name: card_Name,
        //         number: card_Number,
        //         exp_year: card_ExpYear,
        //         exp_month: card_ExpMonth,
        //         cvc: card_CVC
        //     }
        // });
        const cardToken = 'tok_visa';

        const card = await stripe.customers.createSource(customer_id, {
            source: cardToken       //`${card_token.id}`
        });
        res.status(200).send({ card: card.id });


    } catch (error) {
        res.status(400).send(error.message);
    }
}

const createCharges = async (req, res, next) => {
    try {
        const createCharge = await stripe.charges.create({
            receipt_email: 'agiletest03@gmail.com',
            amount: parseInt(req.body.amount) * 100,
            currency: 'USD',
            card: req.body.card_id,
            customer: req.body.customer_id
        });
        res.status(200).send(createCharge);
    } catch (error) {
        res.status(400).send(error.message);

    }
}


module.exports = {
    createCustomer,
    addNewCard,
    createCharges
}