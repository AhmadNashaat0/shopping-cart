const mongoose = require('mongoose');

mongoose.connect(process.env.URL,(error)=>{
    if(error){
        return console.log(error);
    }
    console.log('db connected');
});