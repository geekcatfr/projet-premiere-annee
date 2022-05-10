import { React, useState } from "react";
import { Link } from "react-router-dom";
import { addNewUser } from "../../../utils/login";
import "./Settings.css";

export default function SettingsPage() {
  return (
    <div>
      <h1>Paramètres</h1>
      <AddUser />
      <ManageUsers />
      <SetBackup />
    </div>
  );
}

function AddUser() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const handleSubmit = () => {
    addNewUser(username, password, isAdmin);
  };
  return (
    <div className="addUserContainer">
      <h2 className="subCategory">Ajouter un utilisateur</h2>
      <div className="formContainer">
        <label htmlFor="username">
          Nom d&apos;utilisateur
          <input
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            id="username"
            placeholder="John"
          />
        </label>
        <label htmlFor="password">
          Mot de passe
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
          />
        </label>
        <label htmlFor="isAdmin">
          Rôle
          <select onChange={(e) => setIsAdmin(e.target.value)}>
            <option value={false}>Utilisateur</option>
            <option value={true}>Administrateur</option>
          </select>
        </label>
        <input value="Ajouter" type="button" onClick={handleSubmit} />
      </div>
    </div>
  );
}

function ManageUsers() {
  return (
    <div className="manageUserContainer">
      <h2 className="subCategory">Gérer les utilisateurs</h2>
      <Link to="/admin/users">Accéder</Link>
    </div>
  );
}

function SetBackup() {
  return <h2 className="subCategory">Effectuer une sauvegarde</h2>;
}
