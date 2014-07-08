//server.js

//call the packages we need
var express    = require("express"),
	mongoose   = require("mongoose"),
	bodyParser = require("body-parser"),
	fs         = require("fs"),
	//db         = require("./app/db/db.js"),
	Bear       = require('./app/models/bear'),
	Pickup     = require('./app/models/pickupScrims'),
	cors       = require("cors"),
	app        = express();



//Configuration

try {
	var configJSON = fs.readFileSync(__dirname + "/config.json");
	var config = JSON.parse(configJSON.toString());
} catch(e) {
	console.error("File config.json not found or is invalid: " + e.message);
	process.exit(1);
}

//db.configure(c.mongo);


app.use(cors());
mongoose.connect(config.mongo);
app.use(bodyParser());

var port = process.env.PORT || config.port; //set our port

//Add routes
require('./routes/routes')(app);

//START THE SERVER
//===============================================================================
app.listen(port);
console.log('Magic happens on port: ' + port);