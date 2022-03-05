import React from "react";

import Logo from "./../../assets/icons/logo-ndlp.png";
import "./Login.css";

export default function Login() {
  return (
    <div className="container login-container">
      <div className="login">
        <img src={Logo} alt="Logo NDLP" />
        <h1>Connexion</h1>
        <form>
          <div className="form-content">
            <label htmlFor="email">Email :</label>
            <input type="email" name="email" id="email" required />
            <label htmlFor="password">Mot de passe :</label>
            <input type="password" name="password" id="password" />
            <input type="submit" value="Connexion" />
          </div>
        </form>
      </div>
    </div>
  );
}
