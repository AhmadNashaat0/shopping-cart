const express = require('express');
const app = express();
require('./db/db');
const userRouter = require('./routers/user');

const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/user',userRouter);

app.listen(port, ()=>{
    console.log('server working');
})