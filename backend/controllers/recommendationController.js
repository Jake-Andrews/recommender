const asyncHandler = require('express-async-handler')
const RatingListModel = require('../models/ratingsModel')
const PythonShell = require('python-shell').PythonShell

// @desc    Set recommendations
// @route   POST /api/recommendations
// @access  Private
const setRecommendation = asyncHandler(async (req, res) => {
    //if (!req[0].id) {
    //  res.status(400)
    //  throw new Error('Error looking up the users completed shows!')
    //}
    
    const listOfRecommendations = []
    const { success, err = '', results } = await new Promise((resolve, reject) => {
        const options = {
            mode: 'text', 
            pythonOptions: ['-u'],
            args: [JSON.stringify(req.body)]
        }
        //run python recommendation program, returns a json object containing 
        //information about the recommended shows (results)
        PythonShell.run('./backend/controllers/recommender.py', options, function (err, results) {
            if (err) {
                res.status(500).send({
                    error: err
                })
                reject({ success: false, err });
                console.log(err)
                return
            }
            else {
                resolve({ success: true, results });
                results = JSON.parse(results)
                for (const show of results.data.Page.media){
                    listOfRecommendations.push({'title:': show.title.romaji, 'coverImage': show.coverImage.medium, 'year': show.seasonYear})
                }
            }
        })   
    })    
    if (success) {
    //create entry in database under RatingLists
    const recommendations = await RatingListModel.create({
        user: req.user.id,
        animeShows: listOfRecommendations
    })
    res.status(200).json(recommendations)
    }   
})

// @desc    Get recommendations
// @route   GET /api/recommnendations
// @access  Private
const getRecommendations = asyncHandler(async (req, res) => {
    const recommendations = await RatingListModel.find({ user: req.user.id })
    res.status(200).json(recommendations)
  })

module.exports = {
    setRecommendation,
    getRecommendations
}