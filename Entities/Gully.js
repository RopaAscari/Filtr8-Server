"use strict";
const mongoose = require('mongoose');

const GullySchema = new mongoose.Schema({
    name: String,
    parish : String,
    country : String,
    diameter : Number,
    length : Number,    
    images : [String]  
});

mongoose.model('Gully',GullySchema);
module.exports = mongoose.model('Gully');