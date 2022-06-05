const mongoose = require('mongoose')

const animeListSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    anime: [],
}, {
    timestamps: true
})

module.exports = mongoose.model('AnimeList', animeListSchema)