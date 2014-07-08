// app/models/bear.js

//TODO: fix expire
var mongoose = require("mongoose"),
    Schema   = mongoose.Schema,

    pickupScrimSchema = new Schema({
    	gamertag  : String,
    	created : {
    		type    : Date,
    		default : Date.now,
    		expireAfterSeconds : 2 * 60
    	},

    	createdAt : {
    		type    : Date,
    		default : 1,
    		expire  : 15 * 60
    	}
    });
/*
    pickupScrimSchema.index(
	    {
	    	createdAt: 1
	    }, {
	    	expireAfterSeconds : 15 * 60
	    }
    ); */

module.exports = mongoose.model('pickupScrim', pickupScrimSchema);