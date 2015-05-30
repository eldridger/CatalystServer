// app/models/bear.js

//TODO: fix expire
import mongoose from 'mongoose';
let schema = {
	gamertag: String,
	created: {
		type: Date,
		default: Date.now,
		expireAfterSeconds: 2 * 60
	},

	createdAt: {
		type: Date,
		default: 1,
		expire: 15 * 60
	}
};
/*
    pickupScrimSchema.index(
	    {
	    	createdAt: 1
	    }, {
	    	expireAfterSeconds : 15 * 60
	    }
    ); */

export default mongoose.model('Scrims', schema, 'scrims');
