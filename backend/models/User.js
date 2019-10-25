const mongoose = require('mongoose');


var userSchema = mongoose.Schema({
        username: {type: String, minlength:2,  required: true, unique: true },
        password: {type: String, minlength:4,  required: true},

    });

User = mongoose.model('User',userSchema);
module.exports = User;
