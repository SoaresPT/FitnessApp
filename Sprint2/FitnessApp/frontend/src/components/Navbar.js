import { Link } from 'react-router-dom'

const Navbar = () => {

  return (
    <header>
      <div className="container"> 
        <Link to="/"><h1>FitnessApp</h1></Link>
        <nav>
          <div>
            <Link className="links" to="/Measure">Measure</Link>
            <Link className="links" to="/History">History</Link>
            <Link className="links" to="/Explore">Explore</Link>
            <Link className="links" to="/Login">Login</Link>
            <Link className="links" to="/Signup">Signup</Link>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Navbar