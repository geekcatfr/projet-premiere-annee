import { Outlet, Link } from "react-router-dom";
import React from "react";

import "./Navbar.css";
import logo from "./logo-ndlp.png";

export default function Navbar() {
  const [isConnected, setIsConnected] = useState(false);

  const isConnected = () => {};

  return (
    <div>
      <nav>
        <div className="navbar">
          <div className="navbar-left">
            <img src={logo} alt="logo fcpro" />
            <Link to="/">FC Pro</Link>
          </div>
          <div className="navbar-right">
            <Link to="/formations">Formations</Link>
            <Link to="/about">A propos</Link>
            <Link to="/login">
              {isConnected ? "Se connecter" : "Se déconnecter"}
            </Link>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}
