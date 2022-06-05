const mongoose = require('mongoose')

const goalSchema = mongoose.Schema({
    id: {
      type: Number,
      required: [true, 'Please add an id']
    },
    score: {
      type: Number,
      required: [true, 'Please add a score']
    },
    title: {
      type: String,
      required: [true, 'Please add a title']
    },
    coverImage: {
      type: String,
      required: [true, 'Please add a cover image']
    },
})

module.exports = mongoose.model('Goal', goalSchema)
