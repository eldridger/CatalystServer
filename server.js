//server.js

//call the packages we need
var express    = require("express"),
	mongoose   = require("mongoose"),
	bodyParser = require("body-parser"),
	Bear       = require('./app/models/bear'),
	//cors       = require("cors"),
	app        = express();

mongoose.connect('mongodb://test:1234@ds027908.mongolab.com:27908/test_bears');
app.use(bodyParser());

var port = process.env.PORT || 8080; //set our port

//Routes for our APIs
//===============================================================================
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	console.log('Something is happening');
	next();
});

//test route to make sure everything is working ( GET http://localhost:8080/api )
router.get('/', function(req, res) {
	res.json({ message : 'hooray! welcome to our API!' });
});


//More routes go here

// on routes that end in /bears
// ---------------------------------------
router.route('/bears')
	
	//Create a bear (  POST http://localhost:8080/api/bears )
	.post(function(req, res) {

		var bear = new Bear();     //Create new instance of the bear model
		bear.name = req.body.name;  // set the bears name (comes from the request)

		//save the bear and check for errors
		bear.save(function(err) {
			if(err) {
				res.send(err);
				console.log(err);
			}

			res.json({message : 'Bear Created!'});
		})
	})

	//get ALL THE BEARS ( GET http://localhost:8080/api/bears )
	.get(function(req, res) {
		Bear.find(function(err, bears) {
			if(err) {
				res.send(err);
			}

			res.json(bears);
		})
	});

//on routes that end in /bears:bear_id
router.route('/bears/:bear_id')

	//get a single bear ( GET http://localhost:8080/api/bears/:bear_id )
	.get(function(req, res) {
		Bear.findById(req.params.bear_id, function(err, bear) {
			if (err) {
				res.send(err);
			}

			res.json(bear);
		});
	})

	//update bear with given id ( PUT http://localhost:8080/api/bears/:bears_id)
	.put(function(req, res) {

		// Find bear
		Bear.findById(req.params.bear_id, function(err, bear) {
			if (err) {
				res.send(err);
			}

			bear.name = req.body.name; //update bears info

			//save the bear
			bear.save(function(err) {
				if(err) {
					res.send(err);
				}

				res.json({message : 'Bear Updated!'});
			});
		});
	})

	//delete bear with give id ( DELETE http://localhost:8080/api/bears/:bears_id)
	.delete(function(req, res) {

		Bear.remove({
			_id : req.params.bear_id
		}, function(err, bear) {
			if (err){
				res.send(err);
			}

			res.json({ message : 'Bear Successfully Deleted!'});
		});

	});



//REGISTER our routes ------------------------
// all of our routes are prefixed with /api
app.use('/api', router);

//START THE SERVER
//===============================================================================
app.listen(port);
console.log('Magic happens on port: ' + port);