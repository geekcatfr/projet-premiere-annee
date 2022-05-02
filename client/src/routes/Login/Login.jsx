import React, { useEffect, useState } from "react";

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
      "Content-Type": "application/json",
    });

    const req = await fetch("http://127.0.0.1:8000/users/login", {
      method: "POST",
      mode: "cors",
      headers,
      body: JSON.stringify({ username: user, password }),
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

  useEffect(() => {
    checkLoginTokenStorage() ? setisTokenSet(true) : setisTokenSet(false);
  });

  if (!isTokenSet) {
    return (
      <div className="container login-container">
        <div className="login">
          <img className="login-logo" src={Logo} alt="Logo NDLP" />
          <h1>Connexion</h1>
          <div className="form-content">
            <label htmlFor="username">
              Nom d&apos;utilisateur :
              <input
                type="text"
                name="username"
                id="username"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
            <label htmlFor="password">
              Mot de passe :
              <input
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                required
              />
            </label>
            <button onClick={sendFormData} type="button">
              Connexion
            </button>
          </div>
        </div>
      </div>
    );
  }
  window.location = "/admin";
  return null;
}
