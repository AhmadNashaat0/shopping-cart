const express = require('express');
const Product = require('../models/product');
const router = new express.Router();


router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        res.send(products)
    }

    catch (e) {
        console.log(e);
        res.status(500).send(e)
    }


});

router.get('/:productId', async (req, res) => {
    const _id = req.params.productId;

    try {
        const product = await Product.findById(_id)
        if (!product) {
            return res.status(404).send({ error: "Can't Find this product" })
        }

        res.status(200).send({ product })
    }
    catch (e) {
        res.status(500).send(e)
    }

})

router.post("/", async (req, res) => {
    const product = new Product(req.body)

    try {
        await product.save();
        res.status(201).send(product)
    }
    catch (e) {
        res.status(400).send(e.message)
    }

})

/*
TODO:
        * ADD route for updating product
        * Add route for Deleting product




*/



module.exports = router