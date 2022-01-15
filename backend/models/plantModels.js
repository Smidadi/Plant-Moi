const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
    plantName: { type: String },
    likeCount: { type: Number },
    favCount: { type: Number }
});

module.exports = mongoose.model('Plant', plantSchema);