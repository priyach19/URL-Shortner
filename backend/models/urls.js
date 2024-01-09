const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
    originalURL: {
        type: String,
        required: true,
    },
    compressedcode: {
        type: String,
        required: true,
        unique: true
    },
    shortenedURL: {
        type: String,
        required: true,
        unique: true,
    },
    visited: {
        type: Number,
        required: true,
    }
}, {timestamps: true})


const Urls = mongoose.model('Urls', urlSchema)

module.exports = Urls