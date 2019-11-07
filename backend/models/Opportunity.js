const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var opportunitySchema = mongoose.Schema({
    name: {type: String, minlength: 2, required: true},
    desc: {type: String, minlength: 2},
    clientId: {type: String, required: true},
    active: {type: Boolean, required: true},
    company: {type: String, minlength: 2},

    files: []


});
opportunitySchema.plugin(uniqueValidator);
Opportunity = mongoose.model('Opportunity', opportunitySchema);
module.exports = Opportunity;
