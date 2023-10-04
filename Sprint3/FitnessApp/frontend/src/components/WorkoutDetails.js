import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { REACT_APP_API_URL } from '../utils/apiConfig';
import formatDistanceToNow from 'date-fns/formatDistanceToNow' // date-fns

const apiUrl = `${REACT_APP_API_URL}/api/workouts`;

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();

  const handleClick = async () => {
    const response = await fetch(apiUrl + workout._id, {
      method: 'DELETE'
    })
    const deletedWorkout = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: deletedWorkout })
    }
  }

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p><strong>Number of reps: </strong>{workout.reps}</p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete_sweep</span>
    </div>
  )
}

export default WorkoutDetails