import { FaTimes } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { deleteGoal } from '../features/goals/goalSlice'

const Tasks = ({ tasks }) => {
  const dispatch = useDispatch()
  //const genres = ['Action', 'Adventure', 'Comedy', 'Drama', 'Ecchi', 'Fantasy', 'Horror', 'Mahou Shoujo', 
  //'Mecha', 'Music', 'Mystery', 'Psychological', 'Romance', 'Sci-Fi', 'Slice of Life', 'Sports', 'Supernatural', 'Thriller']

  return (
    <div className="list-container">
    <table>
      <thead>
        <tr>
          <th className="">Image</th>
          <th className="header-title">Title</th>
          <th className="">Score</th>
          <th className="">Episodes</th>
          <th className="">Genres</th>
          <th className="">Year</th>
          <th className=""> <FaTimes className='icon'></FaTimes> </th>
        </tr>
      </thead>
      <tbody>
        {tasks[0].anime.map((task) => (
        <tr key={task.title}>
          <td className="data-image"><img src={task.coverImage} alt='Anime Cover'/></td>
          <td className="data-title">{task.title}</td>
          <td className="">{task.score}</td>
          <td className="">{task.episodes}</td>
          <td className="data-genres">{task.genres}</td>
          <td className="">{task.seasonYear}</td>
          <td className=""><FaTimes className='icon' onClick={() => dispatch(deleteGoal(task._id))}></FaTimes></td>
        </tr>
        ))}
      </tbody>
    </table>
    </div>
  )
}

export default Tasks