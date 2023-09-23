require('dotenv').config()
const connectDB = require('./config/db');
const express = require('express')
const cors = require('cors')
const workoutRoutes = require('./routes/workouts')
const customMiddleware = require('./middleware/customMiddleware');
const signupRoutes = require('./routes/signup');
const loginRoutes = require('./routes/login'); // Import the login routes
const protectedRoutes = require('./routes/protectedRoutes'); // Import the protected routes

// express app
const app = express()

const port = process.env.PORT || 3001;
connectDB();

// middleware
app.use(cors()) // Handles CORS
app.use(express.json()) // Parses JSON request bodies
app.use(customMiddleware.requestLogger) // Logs request information

// routes
app.use('/api', signupRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api', loginRoutes);
app.use("/api", protectedRoutes);
app.use(customMiddleware.unknownEndpoint); // Handles unknown endpoints
app.use(customMiddleware.errorHandler); // Handles other errors

app.listen(port, () => console.log(`Server started on port ${port}`));
