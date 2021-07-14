const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        require: true
    },
    slug: {
        type: String,
        require: true,
        lowercase: true,
        unique: true,
        index: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Category', CategorySchema)