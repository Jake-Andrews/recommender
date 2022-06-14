import pandas as pd
import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
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

class RecommenderNet(keras.Model):
    def __init__(self, num_users, num_movies, embedding_size, **kwargs):
        super(RecommenderNet, self).__init__(**kwargs)
        self.num_users = num_users
        self.num_movies = num_movies
        self.embedding_size = embedding_size
        self.user_embedding = layers.Embedding(
            num_users,
            embedding_size,
            embeddings_initializer="he_normal",
            embeddings_regularizer=keras.regularizers.l2(1e-6),
        )
        self.user_bias = layers.Embedding(num_users, 1)
        self.movie_embedding = layers.Embedding(
            num_movies,
            embedding_size,
            embeddings_initializer="he_normal",
            embeddings_regularizer=keras.regularizers.l2(1e-6),
        )
        self.movie_bias = layers.Embedding(num_movies, 1)

    def call(self, inputs):
        user_vector = self.user_embedding(inputs[:, 0])
        user_bias = self.user_bias(inputs[:, 0])
        movie_vector = self.movie_embedding(inputs[:, 1])
        movie_bias = self.movie_bias(inputs[:, 1])
        dot_user_movie = tf.tensordot(user_vector, movie_vector, 2)
        # Add all the components (including bias)
        x = dot_user_movie + user_bias + movie_bias
        # The sigmoid activation forces the rating to between 0 and 1
        return tf.nn.sigmoid(x)

    #class method is called when model is loaded
    @classmethod
    def from_config(cls, config):
        #number of users, number of shows, embedding size
        #used when creating the model
        return cls(20337, 16502, 5)

def recommend(user_ratings):
    #create a dataframe with the users show ratings
    test = pd.DataFrame(user_ratings, columns=["user_id", "id", "score"])
    #.csv file contains 5mil+ ratings of shows by various users
    df_result = pd.read_csv('./backend/controllers/ratings_5mil_plus_fixed.csv')
    #get the largest user_id, user is + 1
    user_id = df_result['user_id'].max() + 1
    test['user_id'] = user_id
    #concat the users_ratings and the 5mil+ ratings
    df = pd.concat([df_result, test], ignore_index=True)

    user_ids = df["user_id"].unique().tolist()
    user2user_encoded = {x: i for i, x in enumerate(user_ids)}
    userencoded2user = {i: x for i, x in enumerate(user_ids)}
    movie_ids = df["id"].unique().tolist()
    movie2movie_encoded = {x: i for i, x in enumerate(movie_ids)}
    movie_encoded2movie = {i: x for i, x in enumerate(movie_ids)}
    df["user"] = df["user_id"].map(user2user_encoded)
    df["movie"] = df["id"].map(movie2movie_encoded)
    df["score"] = df["score"].values.astype(np.float32)

    #load the model, passing in the RecommenderNet class
    model = keras.models.load_model(
        "./backend/controllers/my_model", custom_objects={"RecommenderNet": RecommenderNet}
    )
    #csv file contains anime ids and their titles, used since ratings_5mil_plus_fixed.csv
    #does not contain titles, only anime ids
    movie_df = pd.read_csv("./backend/controllers/anime.csv")

    # Get the given user_id's, recommendations
    #user_id = df.user_id.sample(1).iloc[0]
    movies_watched_by_user = df[df.user_id == user_id]
    movies_not_watched = movie_df[
        ~movie_df["anime_id"].isin(movies_watched_by_user.id.values)
        ]["anime_id"]
    movies_not_watched = list(
        set(movies_not_watched).intersection(set(movie2movie_encoded.keys()))
    )
    movies_not_watched = [[movie2movie_encoded.get(x)] for x in movies_not_watched]
    user_encoder = user2user_encoded.get(user_id)
    user_movie_array = np.hstack(
        ([[user_encoder]] * len(movies_not_watched), movies_not_watched)
    )
    ratings = model.predict(user_movie_array, verbose=0).flatten()
    top_ratings_indices = ratings.argsort()[-10:][::-1]
    recommended_movie_ids = [
        movie_encoded2movie.get(movies_not_watched[x][0]) for x in top_ratings_indices
    ]
    #get the anime_id's, so we can make a request to anilist api for more info on show
    recommended_movies = movie_df[movie_df["anime_id"].isin(recommended_movie_ids)]
    top_N_indices = []
    for row in recommended_movies.itertuples():
        top_N_indices.append(row.anime_id)

    variables = {'page': 1, 'perPage': 10, 'id_in': top_N_indices}
    response = requests.post(GRAPHQL_API, json={'query': GET_ANIME_NAME_QUERY, 'variables': variables})

    return response.text

if __name__ == "__main__":
    #printing passes data from python file to js using python-shell
    usersList = json.loads(sys.argv[1])
    print(recommend((usersList)))