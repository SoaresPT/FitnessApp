const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('Headers:  ', request.headers);
  console.log('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  response.status(500);
  response.json({
    message: error.message,
  })
}

const jwt = require("jsonwebtoken");

const authenticateToken = (request, response, next) => {
  // Get the JWT token from the request headers
  const token = request.header("Authorization");

  // Check if the token is missing
  if (!token) {
    return response.status(401).json({ error: "Unauthorized: Missing token" });
  }

  try {
    // Verify and decode the token using your JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user data to the request for future use in the route handler
    request.user = decoded;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    // Token verification failed
    return response.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};


module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  authenticateToken
}