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
    <div className="NavBar ">
      <div className="NavText">
      <ul>
        <li className="Title">
          Formations
            <ul>
              <li>Ajouter</li>
            </ul>
          </div>
        </li>

        <li className="Title">
          Paramètres
          <div className="NavText">
            <ul>
              <li>Utilisateurs</li>
              <li>Sauvegardes</li>
            </ul>
          </div>
        </li>

        <li className="Title">
          Pages
          <div className="NavText">
            <ul>
              <li>Ajouter une page</li>
            </ul>
          </div>
        </li>

        <li className="Title">
          Statistiques
          <div className="NavText">
            <ul>
              <li>Exporter</li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  );
}
