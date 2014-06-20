// app/models/bear.js

var mongoose = require("mongoose"),
    Schema   = mongoose.Schema,

    pickupScrimSchema = new Schema({
    	gamertag : String
    });

module.exports = mongoose.model('pickupScrim', pickupScrimSchema);