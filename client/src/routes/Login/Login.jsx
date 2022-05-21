import { React, useEffect, useState } from "react";

import Logo from "../../assets/icons/logo-ndlp.png";
import { checkLoginTokenStorage } from "../../utils/login";
import "./Login.css";

export default function Login() {
  const [user, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [isTokenSet, setisTokenSet] = useState(false);
  const [error, setError] = useState(false);

  const sendFormData = async () => {
    const headers = new Headers({
      accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    });

    const req = await fetch(`http://127.0.0.1:8000/token`, {
      method: "POST",
      mode: "cors",
      headers,
      body: `?grant_type=&username=${user}&password=${password}&scope=&client_id=&client_secret=`,
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (!(result.token === undefined)) {
            localStorage.setItem("token", result.token);
            setisTokenSet(true);
          } else {
            setError("Impossible to get token.");
          }
        },
        (err) => {
          setError(err);
        }
      );
  };

  if (!isTokenSet) {
    return (
      <div className="login-container login">
        <img src={Logo} alt="Logo NDLP" />
        <h1>Connexion</h1>
        <div className="form-content">
          <label htmlFor="username">
            Nom d&apos;utilisateur
            <input
              type="text"
              name="username"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label htmlFor="password">
            Mot de passe
            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              required
            />
          </label>
          <input value="Connexion" onClick={sendFormData} type="button" />
        </div>
      </div>
    );
  }
  window.location = "/admin";
  return null;
}
