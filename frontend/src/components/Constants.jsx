export const GRAPHQL_API='https://graphql.anilist.co'
export const GET_ANIME_QUERY=`
query ($userName: String){
  MediaListCollection(userName:$userName, type:ANIME){
    lists {
      name
      isCustomList
      isSplitCompletedList
      status
      entries {
        id
        score
        advancedScores
        progress
        mediaId
        media {
          title {
            english
          }
          coverImage {
            medium
          }
          seasonYear
          episodes
          genres
        }
      }
    }
  }
}
`
export const GET_PICTURE_QUERY=`
query ($id: Int!){
  Media(id:$id, type:ANIME){
    title {
      english
    }
    coverImage {
      medium
    }
  }
}
`

export const GET_ANIME_QUERY1=`
query ($userName: String){
  MediaListCollection(userName:$userName, type:ANIME){
    lists {
      name
      isCustomList
      isSplitCompletedList
      status
      entries {
        id
        score
        advancedScores
        progress
        mediaId
        media {
          title {
            english
          }
          id
          coverImage {
            medium
          }
        }
      }
    }
  }
}
`