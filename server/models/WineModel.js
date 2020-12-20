const mongoose = require('mongoose')

const WineSchema = new mongoose.Schema({
    pictureURL: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    instructions: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('wines', WineSchema)