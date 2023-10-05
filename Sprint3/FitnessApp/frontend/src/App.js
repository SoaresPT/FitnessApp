import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; // Import BrowserRouter, Routes, and Route
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Explore from './pages/Explore';
import History from './pages/History';
import Measure from './pages/Measure';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Logout from './pages/Logout';
import { useAuthContext } from './hooks/useAuthContext';

const App = () => {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Measure" element={user ? <Measure /> : <Navigate to="/login" />} />
            <Route path="/History" element={user ? <History /> : <Navigate to="/login" />} />
            <Route path="/Explore" element={user ? <Explore /> : <Navigate to="/login" />} />
            <Route path="login" element={!user ? <Login /> : <Navigate to="/Explore" />} />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/Explore" />} />

            {/* Add a protected dashboard route */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
