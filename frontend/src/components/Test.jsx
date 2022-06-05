import { FaTimes } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { deleteGoal } from '../features/goals/goalSlice'

const Test = ({ goals }) => {
  const dispatch = useDispatch()

  return (
    <tr>
        <td className=""><img src={goals.coverImage} alt='Anime Cover'/></td>
        <td className="">{goals.title}</td>
        <td className="">{goals.score}</td>
        <td className=""><FaTimes className='icon' onClick={() => dispatch(deleteGoal(goals._id))}></FaTimes></td>
    </tr>
  )
}

export default Test