import { React, useState } from "react";
import { Link } from "react-router-dom";
import { addNewUser } from "../../../utils/login";

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
      <h2>Ajouter un utilisateur</h2>
      <div className="formContainer">
        <label htmlFor="username">
          Nom d'utilisateur
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
            <option value="false">Utilisateur</option>
            <option value="true">Administrateur</option>
          </select>
        </label>
        <button type="button" onClick={handleSubmit}>
          Ajouter
        </button>
      </div>
    </div>
  );
}

function ManageUsers() {
  return (
    <div className="manageUserContainer">
      <h2>Gérer les utilisateurs</h2>
      <Link to="/admin/users">Accéder</Link>
    </div>
  );
}

function SetBackup() {
  return <h2>Effectuer une sauvegarde</h2>;
}
