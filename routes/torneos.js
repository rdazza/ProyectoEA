/**
 * Created by Ruben on 18/03/2017.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Torneo = require('../models/torneo.js');

router.get('/alltorneos', function(req, res, next) {
    Torneo.find(function (err, torneos) {
        if (err) res.send(500, err.message);

        console.log('GET /torneos')
        res.status(200).jsonp(torneos);
    });
});
router.post('/addtorneo', function(req, res, next) {
    console.log (req.body)
   var creador= {
        nombre: req.body.creador.nombre,
        email: req.body.creador.email
    }
    var torneo = new Torneo({
        nombre: req.body.nombre,
        participantes: req.body.participantes,
        creador: creador

    })

    torneo.save(function (err, torneo) {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(torneo);
    });
    //yeah
});

module.exports = router;