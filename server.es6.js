//var express    = require("express"),
//    mongoose   = require("mongoose"),
//    bodyParser = require("body-parser"),
//    fs         = require("fs"),
////db         = require("./app/db/db.js"),
//    Bear       = require('./app/models/bear'),
//    Pickup     = require('./app/models/pickupScrims'),
//    cors       = require("cors"),
//    app        = express();
//
//
//
////Configuration
//
//try {
//    var configJSON = fs.readFileSync(__dirname + "/config.json");
//    var config = JSON.parse(configJSON.toString());
//} catch(e) {
//    console.error("File config.json not found or is invalid: " + e.message);
//    process.exit(1);
//}
//

////db.configure(c.mongo);
//
//
//app.use(cors());
//mongoose.connect(config.mongo);
//app.use(bodyParser());
//
//var port = process.env.PORT || config.port; //set our port
//
////Add routes
//require('./routes/routes')(app);
//
////START THE SERVER
////===============================================================================
//app.listen(port);
//console.log('Magic happens on port: ' + port);

import app from './app.js';
import http from 'http';
let debug = require('debug')('CatalystServer:server');

/**
 * Get port from environment and store in Express.
 */
let port = normalizePort(process.env.PORT || '8081');
app.set('port', port);


app.listen(port);
console.log(`listening to port ${port}`);

/**
 * Create HTTP server
 */
//let server = http.createServer(app);
//
///**
// * Listen on provided port, on all network interfaces.
// */
//server.listen(port);
//server.on('error', onError);
//server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 * @param val
 */
function normalizePort(val) {
    let port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}

/**
 * Event listener for HTTP server "error" event.
 * @param error
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    let bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event
 */
function onListening() {
    let addr = server.address();
    let bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
    debug(`Listening on ${bind}`)
}