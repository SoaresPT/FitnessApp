import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { REACT_APP_API_URL } from '../utils/apiConfig';

const apiUrl = `${REACT_APP_API_URL}/api/workouts`;

const WorkoutDetails = ({ workout }) => {
  const {dispatch} = useWorkoutsContext();

  const handleClick = async () => {
    const response = await fetch(apiUrl + workout._id, { 
      method: 'DELETE'
    })
    const deletedWorkout = await response.json();

    if (response.ok) {
      dispatch({type: 'DELETE_WORKOUT', payload: deletedWorkout})
    }
  }

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p><strong>Number of reps: </strong>{workout.reps}</p>
      <p>{workout.createdAt}</p>
      <span onClick={handleClick}>delete</span>
    </div>
  )
}

export default WorkoutDetails