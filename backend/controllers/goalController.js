const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')
const AnimeListModel = require('../models/animeListModel')
const User = require('../models/userModel')
const { update } = require('../models/goalModel')

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await AnimeListModel.find({ user: req.user.id })
  if (!goals) {
    res.status(400)
    throw new Error('Goal not found')
  }
  //console.log(goals)
  res.status(200).json(goals)
})

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const setGoal = asyncHandler(async (req, res) => {
  //if (!req[0].id) {
  //  res.status(400)
  //  throw new Error('Error looking up the users completed shows!')
  //}

  const animeList = await AnimeListModel.create({
    user: req.user.id,
    anime: req.body.animelist,
  })

  res.status(200).json(animeList)
})

// @desc    Update goal
// @route   Patch /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
  console.log('updateGoal')
  const goal = await AnimeListModel.findById(req.params.id)

  if (!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }
  //console.log(req.params._id)
  //console.log(req.body.id)
  const updatedGoal = await AnimeListModel.findOneAndUpdate(
  { _id:req.params.id }, 
  {$set: {'anime.$[el].score':req.body.score}}, 
  {
    arrayFilters: [{ 'el.id':req.body.id }],
    new:true
  })
  //updatedGoal is the previous goal, need to change find new goal
  //const updatedGoalDone = await AnimeListModel.findById(req.params.id)
  res.status(200).json(updatedGoal)
  //console.log(updatedGoal)
})

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await AnimeListModel.findById(req.params.id)

  if (!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await goal.remove()

  res.status(200).json({ id: req.params.id })
})


module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
}