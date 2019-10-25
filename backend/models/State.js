const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');


var stateSchema = mongoose.Schema({
    name: {type: String, minlength:2,  required: true, unique: true }

});
stateSchema.plugin(uniqueValidator);

State = mongoose.model('State',stateSchema);
module.exports = State;
