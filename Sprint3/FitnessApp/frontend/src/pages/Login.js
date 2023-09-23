import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Login successful
        const data = await response.json();
        // Store authentication token or user data in state/local storage/cookies
        // Redirect to a protected route
      } else {
        // Login failed
        const errorData = await response.json();
        setError(errorData.error);
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error:", error);
    }
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>

      <label>Email address:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      {error && <p>{error}</p>}

      <button>Log in</button>
    </form>
  );
};

export default Login;
