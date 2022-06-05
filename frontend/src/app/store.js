import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import goalReducer from '../features/goals/goalSlice'
import recommendationReducer from '../features/recommendations/recommendationSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer,
    recommendations: recommendationReducer, 
  },
})
