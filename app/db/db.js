"use strict";

var mongo = require("mongoose");

module.exports = function(config) {

	var PICKUPS_COLLECTION = '/api/pickups',
		flist = {},
		db;

	flist.configure = function(config) {
		db = mongo.db
	};

	flist.getAllPickups = function(req, res) {
		
		Pickup.find(function(err, pickups) {
			if(err) {
				res.send(err);
			}

			res.json(pickups);
		});
	})

	};



	return flist;


}