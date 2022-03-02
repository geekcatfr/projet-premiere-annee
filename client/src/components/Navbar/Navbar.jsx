import { Routes, Route, Outlet, Link } from "react-router-dom";

import './Navbar.css'
import logo from './logo-ndlp.png'

export default function Navbar() {
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
                        <Link to="/login"> Se connecter</Link>
                    </div>
                </div>
            </nav>
            <Outlet />
        </div>
    )
}