const mongoose = require('mongoose')

const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: ObjectId,
                ref: "Product"
            },
            qty: Number,
            color: String,
            price: Number
        }
    ],
    paymentIntend: {},
    orderStatus: {
        type: String,
        default: "Not Process",
        enum: [
            "Not Process",
            "processing",
            "Dispatched",
            "Cancelled",
            "Completed"
        ]
    }
}, { timestamps: true })

module.exports = mongoose.model('Order', orderSchema)

