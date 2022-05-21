import React from "react";
import { Link } from "react-router-dom";
import "./WelcomeAdmin.css";

export default function WelcomeAdmin() {
  return (
    <div className="container admin-panel">
      <div className="welcome-splash">
        <p>Bienvenue !</p>
        <p>Que souhaitez vous faire ?</p>
      </div>
      <ButtonLayout />
    </div>
  );
}

function ButtonLayout() {
  return (
    <div className="button-grid">
      <Link to="/admin/formations">
        <Button buttonText="Formations" />
      </Link>
      <Link to="/admin/pages">
        <Button buttonText="Pages" />
      </Link>
      <Link to="/admin/stats">
        <Button buttonText="Statistiques" />
      </Link>
      <Link to="/admin/settings">
        <Button buttonText="Paramètres du site" />
      </Link>
    </div>
  );
}

function Button(props) {
  const { buttonText } = props;
  return <div className="admin-button">{buttonText}</div>;
}
