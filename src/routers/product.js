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
router.patch('/:productId', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['price', 'stock'];
    const isValidUpdate = updates.every(update => allowedUpdates.includes(update))

    if (!isValidUpdate) {
        return res.status(400).send({ err: "Invalid update" });
    }
    try {
        const product = await Product.findByIdAndUpdate(req.params.productId, req.body, {
            new: true,
            runValidators: true
        })
        console.log(product);
        if (!product) {
            return res.status(400).send({ error: "product not found in database" })
        }
        res.send(product)
    }
    catch (e) {
        res.status(400).send(e.message)
    }
})

router.delete("/:productId", async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.productId);
        if (!product)
            return res.status(404).send({ err: `can't find product with id ${req.params.productId}` });
        res.send(product)
    }
    catch (e) {
        res.status(500).send({ error: e.message })
    }
})
router.post("/search", async (req, res) => {
    /**
     * TODO:
     * PAGINATION TO SEARCH RESULT
     */
    const query = req.body.name;
    const products = await Product.find({ name: { $regex: `${query}` } })
    res.send(products)
})



module.exports = router