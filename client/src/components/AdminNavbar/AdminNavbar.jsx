import React from "react";

export default function AdminNavbar(props) {
  return (
    <div className="solid">
      <ul>
        <NavbarElement name="Formations" />
        <NavbarElement name="Pages" />
      </ul>
    </div>
  );
}

function NavbarElement(props) {
  return (
    <li>
      <p>{props.name}</p>
      <ul>
        <li>
          <p>Ajouter une page</p>
        </li>
      </ul>
    </li>
  );
}
