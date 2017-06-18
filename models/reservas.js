/**
 * Created by Ruben on 18/06/2017.
 */

var mongoose = require('mongoose');
Schema   = mongoose.Schema;

var reservaSchema = new Schema({
    nombre: {type: Schema.ObjectId, ref: "User" },
    participantes: {type: Number},
    fecha: {type: Date},
});

module.exports = mongoose.model('Reserva', reservaSchema);