const TasksNoId = ({ tasks }) => {
  return (
    <div className="container-grid">
      {tasks[0].animeShows.slice(0,10).map((task) => (
        <div className="item">
          <img src={task.coverImage} alt='Anime Cover'/>
          <h3>{task['title:']} </h3>
          <p>Year: {task.year !== null ? task.year : 'N/A' }</p>
        </div>
      ))}  
    </div>
  )
}

export default TasksNoId