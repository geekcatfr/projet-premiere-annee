import React, { useEffect, useState } from "react";

import Logo from "./../../assets/icons/logo-ndlp.png";
import "./Login.css";

export default function Login() {
  const [user, setUsername] = useState(null)
  const [password, setPassword] = useState(null)

  const sendFormData = async () => {
    let req = await fetch('http://localhost:8000/users/login', {method: 'POST', mode: 'cors', body: JSON.stringify({"username": user, "password": password})})
    const content = await req.json();
    console.log(req)
  }

  return (
    <div className="container login-container">
      <div className="login">
        <img className="login-logo" src={Logo} alt="Logo NDLP" />
        <h1>Connexion</h1>
        <form>
          <div className="form-content">
            <label htmlFor="username">Nom d'utilisateur :</label>
            <input type="text" name="username" id="username" onChange={(e) => setUsername(e.target.value)} required />
            <label htmlFor="password">Mot de passe :</label>
            <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} id="password" required/>
            <button type="button" onClick={sendFormData}>Connexion</button>
          </div>
        </form>
      </div>
    </div>
  );
}
