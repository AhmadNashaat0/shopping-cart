const mongoose = require('mongoose');
const validator = require('validator')



const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 20,
        trim: true
    },
    description: {
        type: String,
        min: 10
    },
    stock: {
        type: Number,
        required: true,
        validate(value) {
            if (value < 0)
                throw new Error("Stock must be +ve number Only")
        }

    },
    price: {
        type: Number,
        required: true,
        validate(value) {
            if (value < 0)
                throw new Error("Price must be +ve number Only")
        }

    }
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product