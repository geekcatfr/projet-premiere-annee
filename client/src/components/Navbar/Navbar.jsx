import { Link } from "react-router-dom";
import { React, useState, useEffect } from "react";

import "./Navbar.css";
import logo from "./logo-ndlp.png";

export default function Navbar() {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      setIsConnected(true);
    }
  }, []);

  const deleteToken = () => {
    localStorage.removeItem("token");
    setIsConnected(false);
  };

  return (
    <nav>
      <div className="navbar">
        <div className="navbar-left">
          <img src={logo} alt="logo fcpro" />
          <Link to="/">FC Pro</Link>
        </div>
        <div className="navbar-right">
          <Link to="/formations">Formations</Link>
          <Link to="/about">A propos</Link>
          {isConnected ? (
            <>
              <Link to="/admin">Administration</Link>
              <Link to="/" onClick={deleteToken}>
                Se déconnecter
              </Link>
            </>
          ) : (
            <Link to="/login">Se connecter</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
