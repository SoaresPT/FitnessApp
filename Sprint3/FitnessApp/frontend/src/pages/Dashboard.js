import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Protected Route Component
const Dashboard = () => {
  // Check if the user is authenticated (e.g., by verifying the token)
  const isAuthenticated = sessionStorage.getItem("token") !== null;

  // Get the navigation function from the hook
  const navigate = useNavigate();

  useEffect(() => {
    // Use the navigate function inside the useEffect hook
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]); // Add navigate as a dependency

  // If not authenticated, return null to avoid rendering anything
  if (!isAuthenticated) {
    return null;
  }

  // If authenticated, render the protected content
  return (
    <div>
      <h2>Dashboard</h2>
      {/* Add your dashboard content here */}
    </div>
  );
};

export default Dashboard;
