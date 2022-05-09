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
import SettingsPage from "./routes/Admin/Settings/SettingsPage";
import TeacherPage from "./routes/Admin/TeacherPage/TeacherPage";
import ManageUsers from "./routes/Admin/Settings/ManageUsers";
import FormateurPage from "./routes/Formateurs/Formateur";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="formations" element={<Formations />} />
          <Route path="formations/:formationId" element={<Formation />} />
          <Route path="formateurs/:formateurId" element={<FormateurPage />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="admin" element={<WelcomeAdmin />} />
          <Route path="admin/formations" element={<FormationPage />} />
          <Route path="admin/formations/edit/:id" element={<EditPage />} />
          <Route path="admin/teachers" element={<TeacherPage />} />
          <Route path="admin/settings" element={<SettingsPage />} />
          <Route path="admin/users" element={<ManageUsers />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("fcpro-root")
);
