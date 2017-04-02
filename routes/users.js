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
            res.status(200).jsonp(user);
        });
    });


    var resultado;
    var request;
    var nombre;
    var fs = require('fs');
    var filename;
    var imagen;

    //PUT- Funcion para subir la foto al servidor (No funciona, arreglar)
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


            })

            user.save(function (err, user) {
                if (err) return resultado.send(500, err.message);
                resultado.status(200).jsonp(user);
            });

        }
    };

    //PUT - Update a register already exists
router.put('/:id', function(req, res, next) {
    User.findById(req.params.id, function (err, user) {
        console.log('PUT');
        console.log(req.body);

        user.nombre = req.body.nombre;
        user.apellidos = req.body.apellidos;
        user.dni = req.body.dni;
        user.email = req.body.email;
        user.phone = req.body.phone;
        user.birthday = req.body.birthday;
        user.imageUrl = req.body.imageUrl;

        user.save(function (err) {
            if (err) return res.send(500, err.message);
            res.status(200).jsonp(user);
        });
    });
});

    //POST - login User
router.post('/login', function(req, res, next) {
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
                    return resultado.status(200).jsonp({"loginSuccessful": true});

                }
                else {
                    return resultado.status(404).jsonp({"loginSuccessful": false});
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


    //endpoints
    /*app.get('/allusers', AllUsers);
    app.get('/users/', findAllUsers);
    app.post('/adduser/', addUser);
    app.get('/user/:id', findById);
    app.put('/user/:id', updateUser);
    app.delete('/user/:id', deleteUser);
    app.post('/user/login', loginUser);
    app.put('/upload/:nombre', uploadimage);*/

module.exports = router;
