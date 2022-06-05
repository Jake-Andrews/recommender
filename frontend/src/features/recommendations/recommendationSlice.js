import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import recommendationService from './recommendationService'

const initialState = {
  recommendations: [],
  isError1: false,
  isSuccess1: false,
  isLoading1: false,
  message1: '',
}

// Create new goal
export const createRecommendation = createAsyncThunk(
    'recommendations/create',
    async (goalData, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await recommendationService.createRecommendation(goalData, token)
      } catch (error) {
        const message1 =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message1)
      }
    }
)

// Get recommendations
export const getRecommendations = createAsyncThunk(
    'recommendations/getAll',
    async (_, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await recommendationService.getRecommendations(token)
      } catch (error) {
        const message1 =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message1)
      }
    }
  )

export const recommendationSlice = createSlice({
name: 'recommendation',
initialState,
reducers: {
    resetRecommendations: (state) => initialState,
},
extraReducers: (builder) => {
    builder
    .addCase(createRecommendation.pending, (state) => {
        state.isLoading1 = true
    })
    .addCase(createRecommendation.fulfilled, (state, action) => {
        state.isLoading1 = false
        state.isSuccess1 = true
        state.recommendations.push(action.payload)
    })
    .addCase(createRecommendation.rejected, (state, action) => {
        state.isLoading1 = false
        state.isError1 = true
        state.message1 = action.payload
    })
    .addCase(getRecommendations.fulfilled, (state, action) => {
        state.isLoading1 = false
        state.isSuccess1 = true
        state.recommendations = action.payload
    })
    .addCase(getRecommendations.rejected, (state, action) => {
        state.isLoading1 = false
        state.isError1 = true
        state.message1 = action.payload
    })
},
})  

export const { resetRecommendations } = recommendationSlice.actions
export default recommendationSlice.reducer