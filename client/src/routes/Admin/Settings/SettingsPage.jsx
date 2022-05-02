import React from "react";

export default function SettingsPage(params) {
  const generatePassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789,?;.:/!§*µù%$£^¨=+°)&é'";
    return Math.random().toString(36).substring(0, 20);
  };
  return (
    <>
      <h1>Paramètres</h1>
      <div>
        <h2>Ajouter un utilisateur</h2>
        <form action="http://localhost:8000/">
          <label htmlFor="username">Nom d'utilisateur</label>
          <input type="text" id="username" placeholder="John" />
          <label htmlFor="password">Mot de passe</label>
          <input type="text" id="password" placeholder="John" />
          <button>Générer un mot de passe</button>
          <input type="submit" />
        </form>
      </div>
    </>
  );
}
