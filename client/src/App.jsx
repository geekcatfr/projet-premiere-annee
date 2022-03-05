import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./App.css";

export default function App() {
  return (
    <div>
      <div className="container first-page-content">
        <p className="first-page-title">Centre de formation FC PRO NDLP</p>
        <div className="about-buttons">
          <Button name="En savoir plus" />
          <Button name="Nos formations" />
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
