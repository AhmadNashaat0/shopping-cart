const express = require('express');
const router = express.Router();
const User = require('../models/user');


router.get('/:me',(req,res)=>{

    res.send('hi');
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
        const user = await User.login(req.body.email, req.body.password);
        const token = user.makeToken();
        await user.save();
        res.cookie('token',token);
        res.send('logged');
    }catch(e){
        console.log(e);
        res.status(400).send(e);
    }
});

module.exports = router;