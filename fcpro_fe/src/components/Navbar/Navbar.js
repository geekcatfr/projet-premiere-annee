import React from "react";
import "./navbar.css";
import {Link} from 'react-router-dom'

function Navbar() {
  return (
    <div>
         <nav>
    <div className="navbar-left">
      <ul>
        <li>
          <Link to="/">FC Pro</Link>
        </li>
      </ul>
    </div>
    <div className="navbar-right">
      <ul>
        <li>
          <Link to="/about">A propos</Link>
        </li>
        <li className="button">
          <Link to="/login"> Se connecter</Link>
        </li>
      </ul>
    </div>
  </nav>
    </div>
  );
}

export default Navbar;
