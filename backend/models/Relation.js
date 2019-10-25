const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');


var relationSchema = mongoose.Schema({
    name: {type: String, minlength:2,  required: true, unique: true }

});
relationSchema.plugin(uniqueValidator);

Relation = mongoose.model('Relation',relationSchema);
module.exports = Relation;
