"use strict";
import express from 'express';
import mongoose from 'mongoose';

import Pickups from '../app/models/pickupScrims';

let router = express.Router();

function remove(where, cb) {
    Pickups.remove(where, (err) => {
        cb('Pickup Scrim removed', err);
    });
}

// logger middleware
router.use((req, res, next) => {
    console.log('%s %s', req.method, req.url);
    next();
});

router.route('/api/pickups')
    //get all pickups (  GET http://localhost:8080/api/pickups )
    .get((req, res) => {
        Pickups.find((err, pickups) => {
            if (err) res.send(err);
            res.json(pickups);
        });
    })
    // create new pickup (  POST http://localhost:8080/api/pickups )
    .post((req, res) => {
        let pickup = new Pickups();
        pickup.gamertag = req.body.gamertag;
        pickup.game = req.body.game;
        console.log(req.body);

        // save and check for errors
        pickup.save((err) => {
            if (err) {
                res.send(err);
                console.log(err);
            }
            res.json({message: 'Pickup Scrim Created'});
        });
    })
    .delete((req, res) => {
        Pickups.remove((err) => {
            if (!err) {
                console.log('removed all pickups');
                res.json({message: 'All pickups removed'});
            } else {
                console.log(err);
            }
        })
    });

// find pickup by game
router.route('/api/pickups/:game')
    .get((req, res) => {
        Pickups.find({game: req.params.game}).exec((err, scrims) => {
            res.json(scrims);
        });
    });

// remove pickup by id
router.route('/api/pickups/:pickup_id')
    //delete pickup with given id ( DELETE http://localhost:8080/api/pickups/:pickup_id)
    .delete((req, res) => {
        remove({_id: req.params.pickup_id}, (message, err) => {
            if (err) {
                res.send(err);
            }
            res.json({message});
        })
    });

export default router;