/**
 * Created by Ruben on 18/03/2017.
 */
var mongoose = require('mongoose');
Schema   = mongoose.Schema;

var clasifSchema = new Schema({

    torneo: {type: String},
    puntuacion: {type: String},
    posicion: {type: String}

    }
);
module.exports = mongoose.model('Clasificacion', clasifSchema);