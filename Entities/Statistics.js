"use strict";
const mongoose = require('mongoose');

const StatisticsSchema = new mongoose.Schema({
    gullyID : String,
    timeStamp : String,
    weight : Number,
    teirNumber : Number
});

mongoose.model('Statistics',StatisticsSchema);
module.exports = mongoose.model('Statistics');