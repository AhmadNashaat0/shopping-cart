const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userSchema  = new mongoose.Schema({
    name:{
        first:{
            type: String,
            required: [true, "First name is required"],
            trim: true,
            maxLength: 15
        },last:{
            type: String,
            required: [true, "Last name is required"],
            trim: true,
            maxLength: 15
        }
    },
    username:{
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: true,
        minLength: 8,
        maxLength: 25
    },
    email:{
        type: String,
        required: [true, "Email is required"],
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
        required: [true, "Email is required"],
        trim: true,
        validate(value) {
            if (validator.isStrongPassword(value)>=30) {
                throw new Error('password not strong enough');
            }
        }
    },
    age:{
        type: String,
        required: [true, "Age is required"],
        trim: true,
        default: 0,
        validate(value){
            if(value<0){
                throw new Error('age is invalid') ;
            }
        }
    },
    admin:{
        type: Boolean,
        default: false
    },
    tokens: [{
        token:{
            type: String,
            required: true
        }
    }],
    cart: [{
        type: mongoose.Types.ObjectId,
        ref: 'Product',
    }]
},{
   timestamps: true 
});

// plugins
userSchema.plugin(uniqueValidator, { message: 'expected {PATH} to be unique.' });

// virtuals
userSchema.virtual('fullName').get(function(){
    return this.name.first + ' ' + this.name.last;
});


// methods
userSchema.methods.makeToken = function () {
    const token = jwt.sign({_id: this._id.toString()}, process.env.JWT_SECRET);
    this.tokens = this.tokens.concat({ token });
    return token;
};

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});


// static functions
userSchema.statics.login = async function({email, password}){
    const user = await User.findOne({ 
        $or: [
            {username:email},
            {email:email.toLowerCase()}
        ]
    });
    if (!user) {
        throw new Error('invalid email.');
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw new Error('worng password.');
    }
    return user;
};


const User = mongoose.model('Users', userSchema);
module.exports =  User;