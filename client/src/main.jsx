import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import FormationPage from "./routes/Admin/FormationPage/FormationPage";
import Formations from "./routes/Formations/Formations";
import Login from "./routes/Login/Login";
import About from "./routes/About/About";
import NotFound from "./routes/NotFound/NotFound";

import WelcomeAdmin from "./routes/Admin/WelcomeAdmin/WelcomeAdmin";
import Home from "./routes/Home/Home";

import "./App.css";
import "normalize.css";
import EditPage from "./routes/Admin/EditPage/EditPage";
import App from "./App";
import Formation from "./routes/Formations/Formation";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="formations" element={<Formations />} />
          <Route path="formations/:formationId" element={<Formation />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="admin" element={<WelcomeAdmin />} />
          <Route path="admin/formations" element={<FormationPage />}>
            <Route path="edit/:id" element={<EditPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
