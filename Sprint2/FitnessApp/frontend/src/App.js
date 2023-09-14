import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Explore from './pages/Explore'
import History from './pages/History'
import Measure from './pages/Measure'
import Navbar from './components/Navbar'


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
          <Route 
              path="/" 
              element={<Home />} 
            />
            <Route 
              path="/Measure" 
              element={<Measure />} 
            />
            <Route 
              path="/History" 
              element={<History />} 
            />
            <Route 
              path="/Explore" 
              element={<Explore />} 
            />
            <Route 
              path="/login" 
              element={<Login />} 
            />
            <Route 
              path="/signup" 
              element={ <Signup />} 
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}


export default App;

