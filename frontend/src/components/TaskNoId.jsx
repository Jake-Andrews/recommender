//import { useDispatch } from 'react-redux'

const TaskNoId = ({ goals }) => {
  //const dispatch = useDispatch()

  return (
    <div class="item">
        <img src={goals.coverImage} alt='Anime Cover'/>
        <h3>{goals['title:']} </h3>
        <p>Year: {goals.year !== null ? goals.year : 'N/A' }</p>
    </div>
  )
}

export default TaskNoId