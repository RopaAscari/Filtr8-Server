const express = require('express');
const app = express();
require('dotenv/config');
const bodyParser = require('body-parser');
const gullyService = require('./Services/GullyService');
const statisticsService = require('./Services/StatisticsService');
const userService = require ('./Services/UserService')
const { urlencoded } = require('body-parser');
const helmet = require("helmet");
const PORT = 8080;

app.use(helmet());
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb'}));

app.use('/statistics',statisticsService);
app.use('/gully',gullyService);
app.use('/user',userService);

app.listen(PORT,()=>{
    console.log("Listening on port",PORT);
})
module.exports = app;
