const express = require('express');
const app = express();
require('dotenv').config({path: require('path').resolve(__dirname,'../config/.env')});
require('./db/db.js');
require('./routers/index.js')(app);

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log('server working on port',port);
})