const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: { type: String },
    email: { type: String },
    password: { type: String },
    favoritePlant: { type: Object}
});

module.exports = mongoose.model('User', userSchema);