/**
 * Created by Ruben on 18/03/2017.
 */
var mongoose = require('mongoose');
Schema   = mongoose.Schema;

var userSchema = new Schema({
    nombre:    { type: String },
    apellidos:    { type: String },
    dni:  { type: String },
    email:   { type: String },
    phone:   { type: String },
    birthday: { type: String},
    password: { type:String},
    imageUrl: {type: String},
    idProvider: {type: Number},
    imgProvider: {type: String},
    rol: {type: String, default: "register"},
    torneos: [{
        torneo: { type: Schema.ObjectId, ref: "Torneo" },
        resultado: {type: Number}
            }
    ],
});


module.exports = mongoose.model('User', userSchema);