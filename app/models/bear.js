// app/models/bear.js

var mongoose = require("mongoose"),
    Schema   = mongoose.Schema,

    bearSchema = new Schema({
    	name : String
    });

module.exports = mongoose.model('Bear', bearSchema);