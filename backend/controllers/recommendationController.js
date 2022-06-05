const asyncHandler = require('express-async-handler')
const RatingListModel = require('../models/ratingsModel')
const PythonShell = require('python-shell').PythonShell
const axios = require('axios')
const Constants = require('../config/Constants')
const { lstat } = require('fs')

// @desc    Set recommendations
// @route   POST /api/recommendations
// @access  Private
const setRecommendation = asyncHandler(async (req, res) => {
    //if (!req[0].id) {
    //  res.status(400)
    //  throw new Error('Error looking up the users completed shows!')
    //}
    //console.log('rec controller')
    //console.log(req.body)
    const listOfRecommendations = []
    const { success, err = '', results } = await new Promise((resolve, reject) => {
        const options = {
            mode: 'text', 
            pythonOptions: ['-u'],
            args: [JSON.stringify(req.body)]
        }
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
    //console.log(results)
    const recommendations = await RatingListModel.create({
        user: req.user.id,
        animeShows: listOfRecommendations
    })
    //console.log(recommendations)
    res.status(200).json(recommendations)
    }   
})

// @desc    Get recommendations
// @route   GET /api/recommnendations
// @access  Private
const getRecommendations = asyncHandler(async (req, res) => {
    const recommendations = await RatingListModel.find({ user: req.user.id })
    //console.log(JSON.stringify(recommendations))
    res.status(200).json(recommendations)
  })

const GRAPHQL_API='https://graphql.anilist.co'
const GET_ANIME_NAME_QUERY=`
query ($page: Int, $perPage: Int, $id_in: [Int]){
    Page (page: $page, perPage: $perPage) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    media(id_in: id_in) {
         title {
           romaji
           english
           native
           userPreferred
         } 
      }
    }
}
`

module.exports = {
    setRecommendation,
    getRecommendations
}