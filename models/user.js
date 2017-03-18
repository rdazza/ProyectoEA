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
    torneos: [{
        torneo: { type: Schema.ObjectId, ref: "Torneo" }
            }
    ]
});


module.exports = mongoose.model('User', userSchema);