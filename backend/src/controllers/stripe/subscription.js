import stripe from "../../config/stripe";
import express from 'express';
const subscriptionRouter = express.Router();

subscriptionRouter.post('/create', async (req, res) => {
    const { email, payment_method } = req.body;
    const customer = await stripe.customers.create({
        email,
        payment_method
    });
    const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: process.env.STRIPE_PRICE_ID }]
    });
    res.json(subscription);
});

subscriptionRouter.post('/test-payment-intent', async (req, res) => {
    const { amount } = req.body;
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
        });
        return res.status(200).send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

export default subscriptionRouter;