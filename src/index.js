const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname,'../config/.env')});
require('./db/db');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRouter = require('./routers/user');
const productRouter = require('./routers/product');
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use('/user', userRouter);
app.use('/products', productRouter)

app.listen(port, () => {
    console.log('server working');
})