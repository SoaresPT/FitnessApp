import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupStatus, setSignupStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Signup successful!", data);
        setSignupStatus("Signup successful!");
        setEmail("");
        setPassword("");
      } else {
        const errorData = await response.json();
        console.error("Signup failed:", errorData);
        setSignupStatus(errorData.error); // Set the error message received from the backend
      }
    } catch (error) {
      console.error("Error:", error);
      setSignupStatus("An error occurred. Please try again later.");
    }
  };

  return (
    <div>
      <form className="signup" onSubmit={handleSubmit}>
        <h3>Sign Up</h3>

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

        <button>Sign up</button>
      </form>

      {signupStatus && <p>{signupStatus}</p>}

      {signupStatus === "Signup successful!" && (
        <p>
          <Link to="/login">Login here</Link>
        </p>
      )}
    </div>
  );
};

export default Signup;
