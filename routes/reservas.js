/**
 * Created by Ruben on 18/06/2017.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Reserva = require('../models/reservas.js');
var User = require('../models/user.js');

router.get('/allreservas', function(req, res, next) {
    Reserva.find(function (err, reservas) {
        if (err) res.send(500, err.message);

        console.log('GET /reservas')
        User.populate(reservas, {path: "nombre"}, function (err, users) {
            res.status(200).send(users);
        });

    });
});
router.post('/addreserva', function(req, res, next) {
    console.log (req.body)
    var reserva = new Reserva({
        nombre: req.body.nombre,
        participantes: req.body.participantes,
        fecha: req.body.reserva
    })

    reserva.save(function (err, reserva) {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(reserva);
    });
    //yeah
});

module.exports = router;