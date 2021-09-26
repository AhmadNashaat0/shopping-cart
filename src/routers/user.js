const express = require('express');
const router = express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth')


router.get('/',auth,(req,res)=>{
    res.send(req.user.tokens);
});

router.post('/register', async(req,res)=>{
    try{
        const user = new User(req.body);
        const token = user.makeToken();
        await user.save();
        res.cookie('token',token);
        res.status(201).send('added');
    }catch(e){
        res.status(400).send(e);
    }
});

router.post('/login', async(req,res)=>{
    try{
        const user = await User.login(req.body);
        const token = user.makeToken();
        await user.save();
        res.cookie('token',token);
        res.send('logged');
    }catch(e){
        res.status(400).send(e.message);
    }
});

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.cookies.token;
        });
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send();
    }
});

router.post('logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send();
    }
});

router.patch('/me' ,auth ,async (req,res)=>{
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    try{
        if (!isValidOperation) {
            throw new Error('not allowed to be changed');
        }
        updates.forEach((update) => req.user[update] = req.body[update]);
        await req.user.save();
        res.send('updated');
    }catch(e){
        res.status(400).send(e);
    }
});

router.delete('/me', auth, async(req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router;