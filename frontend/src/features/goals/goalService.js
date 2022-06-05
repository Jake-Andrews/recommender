import axios from 'axios'
import * as Constants from '../../components/Constants'

const API_URL = '/api/goals/'

const formatJsonAnimeList = (animeList) => {
  const test = []
  const test1 = {'animelist': test}
  animeList.forEach(anime => {
    const temp = {}
    for (let key in anime) {
      if (key==='mediaId') {
        temp.id = anime[key]
      }
      else if (key==='score') {
        temp.score = anime[key]
      }
      else if (key==='media') {
        temp.title = anime[key].title.english
        temp.coverImage = anime[key].coverImage.medium
        temp.seasonYear = anime[key].seasonYear
        temp.episodes = anime[key].episodes
        //const tempVar = anime[key].genres
        //tempVar = tempVar.split(/(Action|Adventure|Comedy|Drama|Ecchi|Fantasy|Horror|Mahou Shoujo|Mecha|Music|Mystery|Psychological|Romance|Sci-Fi|Slice of Life|Sports|Supernatural|Thriller)/)
        //console.log(tempVar)
        //temp.genres = tempVar.join(", ")
        temp.genres = anime[key].genres.join(", ")
      }
    }
    test.push(temp)
  })
  return test1
}

// Post request to Anilist api, recieves list of user's shows with ratings
const fetchData = async (accountName) => {
  const queryResult = await axios.post(Constants.GRAPHQL_API, {
    query: Constants.GET_ANIME_QUERY,  
    variables: { userName: accountName },
   })
  const result = queryResult.data.data.MediaListCollection.lists[0].entries
  return result
}
// Create new goal
const createGoal = async (goalData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  //console.log(goalData)
  const arrayOfAnime = await fetchData(goalData.text)
  //console.log(arrayOfAnime)
  const properlyFormattedarrayOfAnime = formatJsonAnimeList(arrayOfAnime)
  const response = await axios.post(API_URL, properlyFormattedarrayOfAnime, config)

  return response.data
}

// Get user goals
const getGoals = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)
  //console.log(response)
  return response.data
}

// Delete user goal
const deleteGoal = async (goalId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + goalId, config)

  return response.data
}

const goalService = {
  createGoal,
  getGoals,
  deleteGoal,
}

export default goalService