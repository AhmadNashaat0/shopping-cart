const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer:{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    products:[{
        type: mongoose.Types.ObjectId,
        ref: 'Product'
    }]
},{
    timestamps: true
});

module.exports = Order = mongoose.model('Order',orderSchema);ducts, user, total, time