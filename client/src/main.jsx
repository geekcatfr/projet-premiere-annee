import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import App from "./App";
import Navbar from "./components/Navbar/Navbar";
import Formations from "./routes/Formations/Formations";
import Login from "./routes/Login/Login";
import About from "./routes/About/About";
import NotFound from "./routes/NotFound/NotFound";

import { Routes, Route, BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<App />} />
          <Route path="/formations" element={<Formations />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
