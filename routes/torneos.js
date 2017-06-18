/**
 * Created by Ruben on 19/03/2017.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Torneo = require('../models/torneo.js');
var User = require('../models/user.js');

router.get('/alltorneos', function(req, res, next) {
    Torneo.find(function (err, torneos) {
        if (err) res.send(500, err.message);

        console.log('GET /torneos')
        User.populate(torneos, {path: "participantes.participante"}, function (err, users) {
            res.status(200).send(users);
        });

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
        creador: creador,
        reserva: req.body.reserva

    })

    torneo.save(function (err, torneo) {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(torneo);
    });
    //yeah
});
router.delete('/:id', function(req, res, next) {
    console.log (req.params.id)
    return Torneo.findById(req.params.id, function (err, torneo) {
        console.log('DELETE usuario');
        return torneo.remove(function (err) {
            if (!err) {
                console.log("torneo eliminado");
                return res.send('');
            } else {
                console.log(err);
            }
        });
    });
});

router.get('/:id', function(req, res, next) {
    Torneo.findById(req.params.id, function (err, torneo) {
        if (err) return res.send(500, err.message);

        console.log('GET /torneo/' + req.params.id);
        User.populate(torneo, {path: "participantes.participante"}, function (err, user) {
            res.status(200).send(user);
        });
    });
});
module.exports = router;