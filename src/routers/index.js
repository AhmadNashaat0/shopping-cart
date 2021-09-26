 module.exports = app=>{
    app.use(require('express').json());
    app.use(require('cors')());
    app.use(require('cookie-parser')());
    app.use('/user', require('./user'));
    app.use('/products', require('./product'));
 }