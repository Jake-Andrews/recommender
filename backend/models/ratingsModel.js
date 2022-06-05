const mongoose = require('mongoose')

const ratingListSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    animeShows: [],
}, {
    timestamps: true
})

module.exports = mongoose.model('RatingList', ratingListSchema)
