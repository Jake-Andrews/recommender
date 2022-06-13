import pandas as pd
import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from pathlib import Path
import matplotlib.pyplot as plt

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

    @classmethod
    def from_config(cls, config):
        return cls(9225, 15820, 5)

df = pd.read_csv('ratings_trimmed.csv')
#print(df.head())

user_ids = df["user_id"].unique().tolist()
user2user_encoded = {x: i for i, x in enumerate(user_ids)}
userencoded2user = {i: x for i, x in enumerate(user_ids)}
movie_ids = df["id"].unique().tolist()
movie2movie_encoded = {x: i for i, x in enumerate(movie_ids)}
movie_encoded2movie = {i: x for i, x in enumerate(movie_ids)}
df["user"] = df["user_id"].map(user2user_encoded)
df["movie"] = df["id"].map(movie2movie_encoded)

num_users = len(user2user_encoded)
num_movies = len(movie_encoded2movie)
df["score"] = df["score"].values.astype(np.float32)
# min and max ratings will be used to normalize the ratings later

min_rating = min(df["score"])
max_rating = max(df["score"])
print("Number of users: {}, Number of Movies: {}, Min rating: {}, Max rating: {}".format(
    num_users, num_movies, min_rating, max_rating))
'''
df = df.sample(frac=1, random_state=42)
x = df[["user", "movie"]].values
# Normalize the targets between 0 and 1. Makes it easy to train.
y = df["score"].apply(lambda x: (x - min_rating) / (max_rating - min_rating)).values
# Assuming training on 90% of the data and validating on 10%.
train_indices = int(0.9 * df.shape[0])
x_train, x_val, y_train, y_val = (
    x[:train_indices],
    x[train_indices:],
    y[:train_indices],
    y[train_indices:],
)

EMBEDDING_SIZE = 5
model = RecommenderNet(num_users, num_movies, EMBEDDING_SIZE)
model.compile(
    loss=tf.keras.losses.BinaryCrossentropy(), optimizer=keras.optimizers.Adam(lr=0.001)
)
print('test')
history = model.fit(
    x=x_train,
    y=y_train,
    batch_size=64,
    epochs=3,
    verbose=1,
    validation_data=(x_val, y_val),
)

#model.save('my_model')

#plt.plot(history.history["loss"])
#plt.plot(history.history["val_loss"])
#plt.title("model loss")
#plt.ylabel("loss")
#plt.xlabel("epoch")
#plt.legend(["train", "test"], loc="upper left")
#plt.show()

'''
model = keras.models.load_model(
    "my_model", custom_objects={"RecommenderNet": RecommenderNet}
)

movie_df = pd.read_csv("anime.csv")

# Let us get a user and see the top recommendations.
user_id = df.user_id.sample(1).iloc[0]
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
ratings = model.predict(user_movie_array).flatten()
top_ratings_indices = ratings.argsort()[-10:][::-1]
recommended_movie_ids = [
    movie_encoded2movie.get(movies_not_watched[x][0]) for x in top_ratings_indices
]

print("Showing recommendations for user: {}".format(user_id))
print("====" * 9)
print("Movies with high ratings from user")
print("----" * 8)
top_movies_user = (
    movies_watched_by_user.sort_values(by="score", ascending=False)
    .head(5)
    .id.values
)
movie_df_rows = movie_df[movie_df["anime_id"].isin(top_movies_user)]
for row in movie_df_rows.itertuples():
    print(row.anime_title_english, ":", row.genres)

print("----" * 8)
print("Top 10 movie recommendations")
print("----" * 8)
recommended_movies = movie_df[movie_df["anime_id"].isin(recommended_movie_ids)]
for row in recommended_movies.itertuples():
    print(row.anime_title_english, ":", row.genres)