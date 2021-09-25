const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.URL,(error)=>{
    if(error){
        return console.log(error);
    }
    console.log('db connected');
});