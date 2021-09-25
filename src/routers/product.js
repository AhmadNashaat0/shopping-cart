const express = require('express');
const router = new express.Router();
const Product = require('../models/product');


router.get('/', (req, res) => {
    res.send({ products: [] });
})

module.exports = router