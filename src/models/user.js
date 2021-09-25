const mongoose = require('mongoose');

const userSchema  = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    username:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique:true,
        lowercase: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    age:{
        type: String,
        required: true,
        trim: true
    },
    token: {
        type: String,
        required: true
    },
    cart:{
        products:[{
            
        }]
    }
},{
   timestamps: true 
});



const User = mongoose.model('User', userSchema);
module.exports = User;