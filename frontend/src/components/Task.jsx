import { FaTimes } from 'react-icons/fa'
//import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { deleteGoal } from '../features/goals/goalSlice'

const Task = ({ goals }) => {
  const dispatch = useDispatch()

  return (
    <div className='task'>
        <h3>{goals.title} <FaTimes className='icon' onClick={() => dispatch(deleteGoal(goals._id))}/></h3>
        <p>Rating: {goals.score}</p>
        <p></p>
        <img src={goals.coverImage} alt='Anime Cover'/>
    </div>
  )
}

export default Task