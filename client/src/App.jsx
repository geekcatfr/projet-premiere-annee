import React from "react";
import { Link } from "react-router-dom";

import "./App.css";

export default function App() {
  return (
    <div className="container">
      <div className="first-page-content">
        <p className="first-page-title">Centre de formation FC PRO NDLP</p>
        <div className="about-buttons">
          <Link to="/about">
            <Button name="En savoir plus" />
          </Link>
          <Link to="/formations">
            <Button name="Nos formations" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function Button(props) {
  return (
    <>
      <div className="button">{props.name}</div>
    </>
  );
}
