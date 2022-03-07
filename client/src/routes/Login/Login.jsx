import React from "react";

import Logo from "./../../assets/icons/logo-ndlp.png";
import "./Login.css";

export default function Login() {
  return (
    <div className="container login-container">
      <div className="login">
        <img className="login-logo" src={Logo} alt="Logo NDLP" />
        <h1>Connexion</h1>
        <form name="login">
          <div className="form-content">
            <label htmlFor="username">Nom d'utilisateur :</label>
            <input type="text" name="username" id="username" required />
            <label htmlFor="password">Mot de passe :</label>
            <input type="password" name="password" id="password" />
            <input type="submit" value="Connexion" onClick={sendData} />
          </div>
        </form>
      </div>
    </div>
  );
}
