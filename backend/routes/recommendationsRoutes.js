const express = require('express')
const router = express.Router()
const {
  setRecommendation,
  getRecommendations
} = require('../controllers/recommendationController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').post(protect, setRecommendation).get(protect, getRecommendations)
module.exports = router