"use strict";

module.exports = function(app) {
	var Pickup = require('../app/models/pickupScrims');


	var remove = function(id, callback) {
		Pickup.remove({
			_id : id
		}, function(err, todo) {

			callback('Pickup Scrim Removed', err);
		});
	}

	//simple logger
	app.use(function(req, res, next) {
		console.log('%s %s', req.method, req.url);

		next();
	});


	//  ROUTE FOR PICKUP SCRIMS
	app.route('/api/pickups')

		//get all pickups (  GET http://localhost:8080/api/pickups )
		.get(function(req, res) {

			Pickup.find(function(err, pickups) {
				if(err) {
					res.send(err);
				}

				res.json(pickups);
			});

		})

		// create new pickup (  POST http://localhost:8080/api/pickups )
		.post(function(req, res) {

			var pickup = new Pickup();     //Create new instance of the Pickup model
			pickup.gamertag = req.body.gamertag;  // set the gamertag (comes from the request)

			//save the bear and check for errors
			pickup.save(function(err) {
				if(err) {
					res.send(err);
					console.log(err);
				}

				res.json({ message : 'Pickup Scrim Created'});
			})
		})

		// Delete ALL pickup scrims
		.delete(function(req, res) {
			Pickup.remove(function(err) {
				if(!err) {
					console.log("Removed every pickup");
					res.json({ message : 'All Pickups Removed'});
				} else {
					console.log(err);
				}
			})
		});

	app.route('/api/pickups/:pickup_id')
	
		//delete pickup with given id ( DELETE http://localhost:8080/api/pickups/:pickup_id)
		.delete(function(req, res) {
			remove(req.params.pickup_id, function(msg, err) {
				res.json({message : msg});

				if(err) {
					res.send(err);
				}

			});
		});

}