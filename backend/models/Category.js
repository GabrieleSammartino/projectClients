const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');


var categorySchema = mongoose.Schema({
    name: {type: String, minlength:2,  required: true, unique: true }

});
categorySchema.plugin(uniqueValidator);

Category = mongoose.model('Category',categorySchema);
module.exports = Category;
