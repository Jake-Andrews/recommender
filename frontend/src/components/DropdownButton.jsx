import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getGoals, updateGoal } from '../features/goals/goalSlice'
import { useSelector } from 'react-redux'

export const DropdownButtonRating = ({ score, task, tasks }) => {
    const { goals, isLoading, isError, message } = useSelector(
        (state) => state.goals
      )
    const dispatch = useDispatch()
    const [rating, setRating] = useState(score)
    const handleSelect=(e)=>{
        const anime = {coverImage: task.coverImage, episodes: task.episodes, genres: task.genres, 
        id: task.id, score: parseFloat(e), seasonYear: task.seasonYear, title: task.title, _id: tasks._id}
        dispatch(updateGoal(anime))
        if (!isLoading) {
            setRating(e)
        } else {setRating(e)}
        //dispatch(getGoals)
        setRating(e)
    }
    return (
        <DropdownButton 
        className='dropdown-ratings'
        id="dropdown-item-button" 
        title={rating}
        onSelect={handleSelect}>
            <Dropdown.Item eventKey='0'  as="button"> 0  </Dropdown.Item>
            <Dropdown.Item eventKey='1'  as="button"> 1  </Dropdown.Item>
            <Dropdown.Item eventKey='2'  as="button"> 2  </Dropdown.Item>
            <Dropdown.Item eventKey='3'  as="button"> 3  </Dropdown.Item>
            <Dropdown.Item eventKey='4'  as="button"> 4  </Dropdown.Item>
            <Dropdown.Item eventKey='5'  as="button"> 5  </Dropdown.Item>
            <Dropdown.Item eventKey='6'  as="button"> 6  </Dropdown.Item>
            <Dropdown.Item eventKey='7'  as="button"> 7  </Dropdown.Item>
            <Dropdown.Item eventKey='8'  as="button"> 8  </Dropdown.Item>
            <Dropdown.Item eventKey='9'  as="button"> 9  </Dropdown.Item>
            <Dropdown.Item eventKey='10' as="button"> 10 </Dropdown.Item>
        </DropdownButton>
    )
}
export default DropdownButtonRating