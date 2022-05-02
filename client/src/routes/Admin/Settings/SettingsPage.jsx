import React from "react";

export default function SettingsPage() {
  return (
    <>
      <h1>Paramètres</h1>
      <div>
        <h2>Ajouter un utilisateur</h2>
        <form>
          <label htmlFor="username">Nom d'utilisateur</label>
          <input type="text" id="username" placeholder="John" />
          <label htmlFor="password">Mot de passe</label>
          <input type="text" id="password" placeholder="John" />
          
        </form>
      </div>
    </>
  );
}
