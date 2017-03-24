/**
 * Created by Ruben on 18/03/2017.
 */
var mongoose = require('mongoose');
Schema   = mongoose.Schema;

var clasifSchema = new Schema({

    torneo: {type: String},
    nombre: {type: String},
    //participantes array
    puntuacion: {type: String}
    }
);
module.exports = mongoose.model('Clasificacion', clasifSchema);