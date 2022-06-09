import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import GoalForm from '../components/GoalForm'
import Spinner from '../components/Spinner'
import { getGoals, reset } from '../features/goals/goalSlice'
import Tasks from '../components/Tasks'
import TasksNoId from '../components/TasksNoId'
import { createRecommendation, getRecommendations, resetRecommendations } from '../features/recommendations/recommendationSlice'
import Button from 'react-bootstrap/Button'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { recommendations, isLoading1, isError1, message1 } = useSelector(
    (state) => state.recommendations
  )
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  )

  const onClick = () => {
    dispatch(createRecommendation({ goals }))
  }

  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    else if (isError1) {
      console.log(message1)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getGoals())
    dispatch(getRecommendations())

    return () => {
      dispatch(reset())
      dispatch(resetRecommendations())
    }
  }, [user, navigate, isError, message, dispatch, isError1, message1])

  if (isLoading || isLoading1) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Anime Recommender</p>
      </section>
      <Button className='btn btn-block' type='submit' onClick={onClick}>
              Generate Recommendations
      </Button>
      <section className="rec-content">
        {recommendations.length > 0 ? (
            <TasksNoId tasks={recommendations}/>
          ) : (
            <h3>You haven't genereated any recommendations yet!</h3>
          )}
        </section>
      <GoalForm />
      <section className='anime-content'>
        {goals.length > 0 ? (
          <Tasks tasks={goals}/>
        ) : (
          <h3>You have not loaded any shows yet!</h3>
        )}
      </section>
    </>
    

  )
}

export default Dashboard