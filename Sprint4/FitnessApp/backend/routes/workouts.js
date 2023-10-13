const express = require('express')
const {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  putWorkout,
  patchWorkout
} = require('../controllers/workoutController');
const requireAuth = require('../middleware/requireAuthMiddleware')

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

// GET all workouts
router.get('/', getWorkouts)

// GET a single workout
router.get('/:id', getWorkout)

// POST a new workout
router.post('/', createWorkout)

// DELETE a workout
router.delete('/:id', deleteWorkout)

// Update workout using PATCH 
router.patch('/:id', patchWorkout)

// Update workout using PUT 
router.put('/:id', putWorkout)

module.exports = router