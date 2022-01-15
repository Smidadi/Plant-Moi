const mongoose = require('mongoose');

const PlantForList = new mongoose.Schema({
    namePlant: { type: String },
    note: { type: String }
});


const userSchema = new mongoose.Schema({
    userName: { type: String },
    email: { type: String },
    password: { type: String },
    favoritePlant: { type: PlantForList },
    likedPlant: { type: [PlantForList] }
});

module.exports = mongoose.model('User', userSchema);