import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import fs from 'fs';
import bodyParser from 'body-parser';
import logger from 'morgan';

import routes from './routes/index';
import scrimsApi from './routes/pickupScrims';

let app = express();

function connect() {
    mongoose.connect('mongodb://localhost/catalyst');
    mongoose.connection.on('open', () => {
        console.log('Connected to Mongoose...');
    });
}
connect();
mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);

// Bootstrap models
//fs.readdirSync(__dirname, '/app/models').forEach(file => {
//    if (~file.indexOf('.js')) require(path.resolve(__dirname, 'app/models', file));
//});

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(scrimsApi);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        //res.render('error', {
        //    message: err.message,
        //    error: err
        //});
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    //res.render('error', {
    //    message: err.message,
    //    error: {}
    //});
});


export default app;