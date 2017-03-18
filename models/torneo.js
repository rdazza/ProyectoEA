/**
 * Created by Ruben on 18/03/2017.
 */
var mongoose = require('mongoose');
Schema   = mongoose.Schema;

var torneoSchema = new Schema({
    nombre:    { type: String },
    fecha:     {type: Date, default: Date.now},
    participantes:  { type: String },
    creador:
        {
            nombre:  { type: String },
            email: {type: String}

        }


});

module.exports = mongoose.model('Torneo', torneoSchema);