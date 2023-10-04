import { useEffect } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

// components
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"
//Misc.
import { REACT_APP_API_URL } from '../utils/apiConfig';

const apiUrl = `${REACT_APP_API_URL}/api/workouts`;

const History = () => {
  const { workouts, dispatch } = useWorkoutsContext()

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch(apiUrl)
      const allWorkouts = await response.json()

      if (response.ok) {
        dispatch({ type: 'SET_WORKOUTS', payload: allWorkouts }) // payload: full array of workouts
      }
    }

    fetchWorkouts()
  }, [dispatch])

  return (
    <div className="history">
      <div className="workouts">
        {workouts && workouts.map(workout => (
          <WorkoutDetails workout={workout} key={workout._id} />
        ))}
      </div>
      <WorkoutForm />
    </div>
  )
}

export default History