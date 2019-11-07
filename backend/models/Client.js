const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');


var clientSchema = mongoose.Schema({
    company: {type: String, minlength: 2, required: true, unique: true},
    name: {type: String, minlength: 2, required: true},
    email: {type: String, minlength: 2, required: true},
    typoAct: {type: String, minlength: 2},
    url: {type: String, minlength: 4, required: true},
    categoryId: {type: String, required: true},
    relationId: {type: String, required: true},
    exchangeId: {type: String, required: true},
    stateId: {type: String, required: true},
    tagIds: [String],
    typoOpp: {type: String, minlength: 2},
    descOpp: {type: String, minlength: 2},
    note: {type: String, minlength: 2},
    arrayDocs: [String],
    checkDoc: [String]


});
clientSchema.plugin(uniqueValidator);
Client = mongoose.model('Client', clientSchema);
module.exports = Client;
