import axios from 'axios'

const API_URL = '/api/recommendations/'

const createRecommendation = async (goalData, token) => {
    //console.log('rec service')
    //console.log(goalData.goals[0].anime)
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await axios.post(API_URL, goalData.goals[0].anime, config)
    //console.log(JSON.parse(response))
    return response.data
}

const getRecommendations = async (token) => {
    console.log('getRecommendations')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.get(API_URL, config)
    return response.data
  }

const recommendationService = {
    createRecommendation,
    getRecommendations
}

export default recommendationService