/**
 * Created by Ruben on 18/03/2017.
 */
var mongoose = require('mongoose');
Schema   = mongoose.Schema;

var torneoSchema = new Schema({
    nombre:    { type: String },
    fecha:     {type: Date, default: Date.now},
    participantes:  [{
        participante: { type: Schema.ObjectId, ref: "User" },
    }
    ],
    //participantes array. participantes de dicho torneo.
    creador:
        {
            nombre:  { type: String },
            email: {type: String}
        },
    reserva: {type: Date}

});

module.exports = mongoose.model('Torneo', torneoSchema);