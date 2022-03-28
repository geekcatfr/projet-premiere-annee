import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import App from "./App";
import Navbar from "./components/Navbar/Navbar";
import AdminNavbar from "./components/AdminNavbar/AdminNavbar";
import Formations from "./routes/Formations/Formations";
import Login from "./routes/Login/Login";
import About from "./routes/About/About";
import NotFound from "./routes/NotFound/NotFound";

import WelcomeAdmin from "./routes/Admin/WelcomeAdmin/WelcomeAdmin";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index element={<App />} />
        <Route path="/formations" element={<Formations />}>
          <Route path=":id" element={<Formations />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminNavbar />}>
          <Route path="/admin/*" element={<AdminNavbar />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
