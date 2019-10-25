const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');


var tagSchema = mongoose.Schema({
    name: {type: String, minlength:2,  required: true, unique: true }

});
tagSchema.plugin(uniqueValidator);

Tag = mongoose.model('Tag',tagSchema);
module.exports = Tag;
