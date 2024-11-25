import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function NavBar() {
  return (
    <nav className="navbars">

      <div className="navbar-containers">
  
      <div className="navbar-logos">
          <h1> Recipe Master</h1>
        </div>
        
        <ul className="navbar-menus">
              
          
          <li className="navbar-item">
            <Link to="/recipe" className="navbar-links">Recipes</Link>
          </li>
          <li className="navbar-item">
            <Link to="/login" className="navbar-links">Login</Link>
          </li>
          <li className="navbar-item">
            <Link to="/signup" className="navbar-links">Sign Up</Link>
          </li>

          <li className="navbar-item">
            <Link to="/notice" className="navbar-links">Noticeboard</Link>
          </li>

          <li className="navbar-item">
            <Link to="/help" className="navbar-links">HelpDesk</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
