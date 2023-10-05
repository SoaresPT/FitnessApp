import { useEffect } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"
//Misc.
import { REACT_APP_API_URL } from '../utils/apiConfig';

const apiUrl = `${REACT_APP_API_URL}/api/workouts`;

const History = () => {
  const { workouts, dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch(apiUrl, {
        headers: { 'Authorization' : `Bearer ${user.token}` } // sending auth header with the user's token, which we grab on the bakend to protect API routes
      })
      const allWorkouts = await response.json()

      if (response.ok) {
        dispatch({ type: 'SET_WORKOUTS', payload: allWorkouts }) // payload: full array of workouts
      }
    }

    if (user) {
      fetchWorkouts()
    }

  }, [dispatch, user])

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