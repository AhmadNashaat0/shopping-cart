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
})



module.exports = router;