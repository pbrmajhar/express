const router = require('express').Router()
const { authCheck } = require('../middleware/auth.middleware')
const stripe = require('stripe')(process.env.STRIPE_SECRET)
const User = require('../model/user.model')
const Cart = require('../model/cart.model')


router.post('/make-payment', authCheck, async (req, res) => {

    const user = await User.findOne({ email: req.user.email })
    const { cartTotal } = await Cart.findOne({ orderedBy: user._id })
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 20000,
        currency: 'usd',
        payment_method_types: ['card'],
    });
    res.send({
        clientSecret: paymentIntent.client_secret,
    })
})

module.exports = router