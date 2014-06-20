//server.js

//call the packages we need
var express    = require("express"),
	mongoose   = require("mongoose"),
	bodyParser = require("body-parser"),
	Bear       = require('./app/models/bear'),
	Pickup     = require('./app/models/pickupScrims'),
	cors       = require("cors"),
	app        = express();


app.use(cors());
//mongoose.connect('mongodb://heroku_app26335431:egdqoldjoncmv5q5mf1stv4gcc@ds043477.mongolab.com:43477/heroku_app26335431/pickupScrims');
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

/*
router.get('*', function(req, res) {
	res.sendfile('../client/www/index.html');	
})*/

//test route to make sure everything is working ( GET http://localhost:8080/api )
router.get('/', function(req, res) {
	res.json({ message : 'hooray! welcome to our API!' });
});


//More routes go here

// PICKUP SCRIM ROUTES
//-----------------------------------------------------
router.route('/pickups')

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
	});

// pickups specified by id
router.route('/pickups/:pickup_id')
	
	//delete pickup with given id ( DELETE http://localhost:8080/api/pickups/:pickup_id)
	.delete(function(req, res) {
		Pickup.remove({
			_id : req.params.pickup_id
		}, function(err, todo) {
			if(err) {
				res.send(err);
			}

			res.json({ message : 'Pickup Scrim Removed'});
		});
	});


//REGISTER our routes ------------------------
// all of our routes are prefixed with /api
app.use('/api', router);

//START THE SERVER
//===============================================================================
app.listen(port);
console.log('Magic happens on port: ' + port);