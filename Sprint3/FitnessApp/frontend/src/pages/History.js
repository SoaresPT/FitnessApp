<<<<<<< HEAD
import { useEffect } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
=======
import { useEffect, useState } from "react"
>>>>>>> 839118986818b7fdfdc519952f251769f978a935
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"
import { REACT_APP_API_URL } from '../utils/apiConfig';
import "./History.css"
import './star.jpg'

const apiUrl = `${REACT_APP_API_URL}/api/workouts`;

const History = () => {
  const [workouts, setWorkouts] = useState(null)
  const [favorites, setFavorites] = useState([])
  const [areFavoritesVisible, setAreFavoritesVisible] = useState(false)

  const retrieveFavorites = () => {
    let favorites = JSON.parse(sessionStorage.getItem('favoriteExercises')) || [];
    setFavorites(favorites);
  };

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch(apiUrl)
      const json = await response.json()
      if (response.ok) {
        dispatch({ type: 'SET_WORKOUTS', payload: allWorkouts }) // payload: full array of workouts
      }
    }
    fetchWorkouts()
  }, [])

  useEffect(() => {
    retrieveFavorites()
  }, []);

  return (
    <div className="history">
      <div className="workouts">
        {workouts && workouts.map(workout => (
          <WorkoutDetails workout={workout} key={workout._id} />
        ))}
      </div>
      <WorkoutForm />
      <button 
        className="history_button" 
        onClick={() => setAreFavoritesVisible(!areFavoritesVisible)}
      >
        {areFavoritesVisible ? "Hide" : "Show"} Favourites
      </button>
      {areFavoritesVisible && (
        <div className="modal">
          <div className="favourites">
            <h2>Favourite Exercises</h2>
            <button 
              className="close-button"
              onClick={() => setAreFavoritesVisible(false)}
            >
              Close
            </button>
            <div className="grid">
              {favorites.length > 0 ? (
                favorites.map((exercise, index) => (
                  <div key={index} className="grid-item">
                    <p>{exercise.name}</p>
                    <img src={exercise.gifUrl} alt={exercise.name} />
                  </div>
                ))
              ) : (
                <p>No favorite exercises added yet.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default History;
