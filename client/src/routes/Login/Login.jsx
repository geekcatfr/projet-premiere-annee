import React, { useEffect, useState } from "react";

import Logo from "./../../assets/icons/logo-ndlp.png";
import "./Login.css";

export default function Login() {
  const [user, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [token, setToken] = useState(null);
  const [isTokenSet, setisTokenSet] = useState(false);

  const sendFormData = async () => {
    let headers = new Headers({
      "Content-Type": "application/json",
    });

    let req = await fetch("/api/users/login", {
      method: "POST",
      mode: "cors",
      headers: headers,
      body: JSON.stringify({ username: user, password: password }),
    })
      .then((res) => res.json())
      .then((token) => {
        localStorage.setItem("token", token.token);
        console.log(localStorage.getItem("token"));
        setisTokenSet(true);
      });
  };

  const checkToken = () => {};

  if (!isTokenSet) {
    return (
      <div className="container login-container">
        <div className="login">
          <img className="login-logo" src={Logo} alt="Logo NDLP" />
          <h1>Connexion</h1>
          <form>
            <div className="form-content">
              <label htmlFor="username">Nom d'utilisateur :</label>
              <input
                type="text"
                name="username"
                id="username"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label htmlFor="password">Mot de passe :</label>
              <input
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                required
              />
              <button type="button" onClick={sendFormData}>
                Connexion
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  } else {
    window.location = "/admin";
  }
}
