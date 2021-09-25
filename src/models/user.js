const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userSchema  = new mongoose.Schema({
    name:{
        first:{
            type: String,
            required: true,
            trim: true
        },last:{
            type: String,
            required: true,
            trim: true
        }
    },
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique:true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    password:{
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (validator.isStrongPassword(value)>=30) {
                throw new Error('password not strong enough');
            }
        }
    },
    age:{
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(value<0){
                throw new Error('age is invalid') ;
            }
        }
    },
    admin:{
        type: Boolean,
    },
    tokens: [{
        token:{
            type: String,
            required: true
        }
    }]
},{
   timestamps: true 
});

// virtuals
userSchema.virtual('fullName').get(function(){
    return this.name.first + ' ' + this.name.last;
});

// methods
userSchema.methods.makeToken = function () {
    const token = jwt.sign({ _id: this._id.toString(),admin:this.admin}, process.env.JWT_SECRET);
    this.tokens = this.tokens.concat({ token });
    return token;
};

// static functions
userSchema.statics.login = async function(email, password){
    //const user = await User.findOne({ $or : [{username:email},{email:email.lowercase}]});
    const user = await User.findOne({email:email.lowercase});
    if (!user) {
        throw new Error('email is invalid');
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw new Error('worng password');
    }
    return user;
};

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

module.exports =  mongoose.model('Users', userSchema);