import numpy as np
import pandas as pd
from scipy.sparse import csr_matrix
from sklearn.decomposition import TruncatedSVD
import sys
import json
import requests

GRAPHQL_API='https://graphql.anilist.co'
GET_ANIME_NAME_QUERY = '''
query ($page: Int, $perPage: Int, $id_in: [Int]){
    Page (page: $page, perPage: $perPage) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    media(id_in: $id_in) {
         title {
           romaji
           english
           native
           userPreferred
         } 
         coverImage {
             medium
         }
         seasonYear
      }
    }
}
'''
def top_n_movies(user_ratings):
    top_N = 30
    df = pd.read_csv('./backend/controllers/ratings_trimmed.csv')
    #print(df.head(10))
    test = pd.DataFrame(user_ratings, columns=["user_id", "id", "score"])

    #test = pd.DataFrame(eval(user_ratings))
    userId = df['user_id'][2499999] + 1
    test['user_id'] = userId

    df_result = pd.concat([df, test], ignore_index=True)
    #return(df_result)

    M = df_result['user_id'].nunique()
    N = df_result['id'].nunique()

    user_mapper = dict(zip(np.unique(df_result["user_id"]), list(range(M))))
    movie_mapper = dict(zip(np.unique(df_result["id"]), list(range(N))))

    user_inv_mapper = dict(zip(list(range(M)), np.unique(df_result["user_id"])))
    movie_inv_mapper = dict(zip(list(range(N)), np.unique(df_result["id"])))

    user_index = [user_mapper[i] for i in df_result['user_id']]
    item_index = [movie_mapper[i] for i in df_result['id']]

    X = csr_matrix((df_result["score"], (user_index,item_index)), shape=(M,N))

    svd = TruncatedSVD(n_components=20, n_iter=10)
    Z = svd.fit_transform(X.T)
    new_X = svd.inverse_transform(Z).T

    top_N_indices1 = new_X[user_mapper[userId]].argsort()[-top_N:][::-1]
    top_N_indices1 = top_N_indices1.tolist()
    top_N_indices = [int(numeric_string) for numeric_string in top_N_indices1]
    variables = {'page': 1, 'perPage': 50, 'id_in': top_N_indices}
    response = requests.post(GRAPHQL_API, json={'query': GET_ANIME_NAME_QUERY, 'variables': variables})
    #print(response.text)
    return response.text

if __name__ == "__main__":
    usersList = json.loads(sys.argv[1])
    #print((usersList[0]))
    print(top_n_movies((usersList)))