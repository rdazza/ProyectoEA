var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var formidable = require('formidable');
var mongoose = require('mongoose');
var User = require('../models/user.js');
var Torneo = require('../models/torneo.js');

router.get('/allusers', function(req, res, next) {
        User.find(function (err, users) {
            if (err) res.send(500, err.message);
            Torneo.populate(users, {path: "torneos.torneo"}, function (err, users) {
                res.status(200).send(users);
            });
        });
});

    //GET -  GET All Users with pagination
    findAllUsers = function (req, res) {
        var count = req.query.count || 5;
        var page = req.query.page || 1;

        var filter = {
            filters: {
                mandatory: {
                    contains: req.query.filter
                }
            }
        };

        var pagination = {
            start: (page - 1) * count,
            count: count
        };

        var sort = {
            sort: {
                desc: '_id'
            }
        };

        User
            .find()
            .filter(filter)
            .order(sort)
            .page(pagination, function (err, users) {
                if (err) {
                    return res.send(400, {
                        message: getErrorMessage(err)
                    });
                } else {
                    res.jsonp(users);
                }
            });

    };

    //GET - Return a User with specified ID
router.get('/:id', function(req, res, next) {
        User.findById(req.params.id, function (err, user) {
            if (err) return res.send(500, err.message);

            console.log('GET /user/' + req.params.id);
            Torneo.populate(user, {path: "torneos.torneo"}, function (err, user) {
                res.status(200).send(user);
            });
        });
    });


    var resultado;
    var request;
    var nombre;
    var fs = require('fs');
    var filename;
    var imagen;

    //PUT- Funcion para subir la foto al servidor
router.put('/upload/:nombre', function(req, res, next) {
    console.log ("dentro");
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            var tmp_path = files.file.path;
            var tipo = files.file.type;//tipo del archivo
            console.log ("2222222222222222222222222221")
            if (tipo == 'image/png' || tipo == 'image/jpg' || tipo == 'image/jpeg') {
                console.log ("3333333333333333333333333")
                //Si es de tipo png jpg o jpeg
                var aleatorio = Math.floor((Math.random() * 9999) + 1);//Variable aleatoria
                filename = aleatorio + "" + files.file.name;//nombre del archivo mas variable aleatoria

                var target_path = './public/images/' + filename;// hacia donde subiremos nuestro archivo dentro de nuestro servidor
                fs.rename(tmp_path, target_path, function (err) {//Escribimos el archivo
                    fs.unlink(tmp_path, function (err) {//borramos el archivo tmp
                        //damos una respuesta al cliente
                        console.log('<p>Imagen subida OK</p></br><img  src="./images/' + filename + '"/>');
                    });

                });

                var u = req.params.nombre;
                console.log ("11111111111111111111111")
                User.findOne({nombre: u}, function (err, user) {
                    imagen = "http://localhost:3000/images/" + filename;
                    console.log ("usuario: " + user);
                    user.imageUrl = imagen;

                    user.save(function (err) {
                        if (err) return res.send(500, err.message);
                        res.status(200).jsonp(user);
                    });
                });

            } else {
                console.log('Tipo de archivo de imagen no soportada');
            }

            if (err) {
                console.error(err.message);
                return;
            }


        });

    });

router.post("/register-oauth", function (req, res) {
    console.log(req.body)
    User.findOne({"idProvider": req.body.idProvider}, function (err, player) {
        if (!err) {
            if (!player) {
                console.log("PINEY")
                var hash = crypto
                    .createHash("md5")
                    .update(req.body.password)
                    .digest('hex');
                req.body.password = hash
                var player = new User({
                    email: req.body.email,
                    password: req.body.password,
                    apellidos: req.body.apellidos,
                    nombre: req.body.nombre,
                    imageUrl: req.body.imageUrl,
                    idProvider: req.body.idProvider,

                });
                player.save(function (err) {
                    if (err) return res.status(500).send(err.message);
                    res.status(200).jsonp(player);
                });
            } else {
                res.send(player);
            }
        }
    });
});
router.post('/adduser', function(req, res, next) {
    console.log('POST');
    console.log(req.body);
    resultado = res;
    request = req;
    var hash = crypto
        .createHash("md5")
        .update(req.body.password)
        .digest('hex');
    req.body.password = hash
    var u = [];
    var u1;
    var u2;
    nombre = req.body.nombre;
    User.find(nombre, function (err, user) {
        console.log (user);
        if (user == "") {
            u1 = '"' + req.body.nombre + '"';
            checkreg(u1, u2);
        }
        else {
            var user = JSON.stringify(user);
            var res = user.split(",");
            u = res[1].split(":");
            u2 = u[1];
            u1 = '"' + req.body.nombre + '"';
            checkreg(u1, u2);
        }

    });
});

    function checkreg(u1, u2) {

        if (u1 == u2) {
            return resultado.status(409).jsonp("usuario " + nombre + " ya existe");
        }
        else {
            var user = new User({
                nombre: request.body.nombre,
                apellidos: request.body.apellidos,
                dni: request.body.dni,
                email: request.body.email,
                phone: request.body.phone,
                birthday: request.body.birthday,
                password: request.body.password,
                imageUrl: "http://localhost:3000/images/admin.png",
                rol: request.body.rol,
                torneos: request.body.torneos

            })

            user.save(function (err, user) {
                if (err) return resultado.send(500, err.message);
                resultado.status(200).jsonp(user);
            });

        }
    };
router.put('/addparticipante-torneo/:id', function(req, res, next) {
    console.log (req.params.id)
    Torneo.findById(req.params.id, function (err, torneo) {
        console.log('PUT');
        var participante={
            participante: req.body.idplayer
        }
        torneo.participantes.push(participante)
        torneo.save(function (err) {
            if (err) return res.send(500, err.message);
            console.log (torneo)
            Torneo.populate(torneo, {path: "participantes.participante"}, function (err, torneo) {
                res.status(200).send(torneo);
            });

        });




    });

});
router.put('/registro-torneo/:id', function(req, res, next) {
    console.log (req.params.id)
    User.findById(req.params.id, function (err, user) {
        console.log('PUT');
        console.log (req.body.torneo)
        var torneo={
            torneo: req.body.torneo._id
        }
        var torneos=[]
         if (user.torneos.length==0){
         torneos.push(torneo)
         }
         else{
         for (var i=0; i<user.torneos.length; i++){
         torneos.push(user.torneos[i])
         }

         torneos.push(torneo);

         }

        user.torneos = torneos;
        user.save(function (err) {
            if (err) return res.send(500, err.message);
            console.log (user)
            Torneo.populate(user, {path: "torneos.torneo"}, function (err, user) {
                res.status(200).send(user);
            });

        });




    });

});
    //PUT - Update a register already exists
router.put('/:id', function(req, res, next) {
    console.log (req.params.id)
    User.findById(req.params.id, function (err, user) {
        console.log('PUT');
        /*var torneos=[]
        if (user.torneos.length==0){
            torneos.push(req.body.torneos[0])
        }
        else{
            console.log ("2222222222222222")
            for (var i=0; i<user.torneos.length; i++){
                torneos.push(user.torneos[i])
            }

            torneos.push(req.body.torneos[0])

        }*/

            user.nombre = req.body.nombre;
            user.apellidos = req.body.apellidos;
            user.dni = req.body.dni;
            user.email = req.body.email;
            user.phone = req.body.phone;
            user.birthday = req.body.birthday;
            user.imageUrl = req.body.imageUrl;
           // user.torneos = torneos;
            user.save(function (err) {
                if (err) return res.send(500, err.message);
                res.status(200).jsonp(user);
            });



    });
});

    //POST - login User
router.post('/login', function(req, res, next) {
    console.log ("HOLAAAAAAAAAAAAAAAAAAA")
        resultado = res;
        var hash = crypto
            .createHash("md5")
            .update(req.body.password)
            .digest('hex');
        var key = [];
        var p1;
        var p2;
        req.body.password = hash
        var email_user = req.body.email;
        User.find({email: email_user}, function (err, user) {

            if (user.length == 0) {
                return resultado.status(404).jsonp({"loginSuccessful": false});
            }
            else {
                console.log (user[0].nombre);
                console.log (user[0].password);
                console.log (req.body.password)
                if (user[0].password == req.body.password) {
                    console.log ("Entramos..")
                    return resultado.status(200).jsonp({"loginSuccessful": true, "player":user[0]});

                }
                else {
                    return resultado.status(404).jsonp({"loginSuccessful": false});
                }
            }
        });

});

router.post('/addresult/:idtorneo', function(req, res, next) {
    User.findById(req.body._id, function (err, user) {
        console.log (user)
        for (var i=0; i<user.torneos.length; i++){
            if (user.torneos[i].torneo==req.params.idtorneo){
                user.torneos[i].resultado = req.body.resultado;
                user.save(function (err) {
                    if (err) return res.send(500, err.message);
                    res.status(200).jsonp(user);
                });
                break;
            }


        }
    });

});

    //DELETE - Delete a User with specified ID
router.delete('/:id', function(req, res, next) {
    console.log (req.params.id)
        return User.findById(req.params.id, function (err, user) {
            console.log('DELETE usuario');
            return user.remove(function (err) {
                if (!err) {
                    console.log("usuario eliminado");
                    return res.send('');
                } else {
                    console.log(err);
                }
            });
        });
});

module.exports = router;
