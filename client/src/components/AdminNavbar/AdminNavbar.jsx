import React from "react";
import "./AdminNavbar.css";

export default function AdminNavbar(props) {
  return (
    <div className="solid">
      <ul>
        <NavbarElement name="Navbar" />
      </ul>
    </div>
  );
}

function NavbarElement(props) {
  return (
    <div className="NavBar">
      <ul>
        <li className="Title">Formations</li>
        <div className="NavText">
          <ul>
            <li>Ajouter</li>
          </ul>
        </div>

        <li className="Title">Paramètres</li>
        <div className="NavText">
          <ul>
            <li>Utilisateurs</li>
            <li>Sauvegardes</li>
          </ul>
        </div>

        <li className="Title">Pages</li>
        <div className="NavText">
          <ul>
            <li>Ajouter une page</li>
          </ul>
        </div>

        <li className="Title">Statistiques</li>
        <div className="NavText">
          <ul>
            <li>Exporter</li>
          </ul>
        </div>
      </ul>
    </div>
  );
}
