const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
require('./db/db');


app.listen(port, ()=>{
    console.log('server working');
})