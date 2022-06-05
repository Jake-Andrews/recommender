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