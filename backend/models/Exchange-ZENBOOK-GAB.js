const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');


var exchangeSchema = mongoose.Schema({
    name: {type: String, minlength:2,  required: true, unique: true }

});
exchangeSchema.plugin(uniqueValidator);

Exchange = mongoose.model('exchangeSchema',exchangeSchema);
module.exports = Exchange;
