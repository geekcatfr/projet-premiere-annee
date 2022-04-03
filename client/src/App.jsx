import React from "react";

import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import FormationPage from "./routes/Admin/FormationPage/FormationPage";
import Formations from "./routes/Formations/Formations";
import Login from "./routes/Login/Login";
import About from "./routes/About/About";
import NotFound from "./routes/NotFound/NotFound";

import WelcomeAdmin from "./routes/Admin/WelcomeAdmin/WelcomeAdmin";
import Home from "./routes/Home/Home";

import "./App.css";
import EditPage from "./routes/Admin/EditPage/EditPage";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/formations" element={<Formations />}>
          <Route path=":id" element={<Formations />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<WelcomeAdmin />} />
        <Route path="/admin/formations" element={<FormationPage />}></Route>
        <Route path="/admin/formations/edit/:id" element={<EditPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
