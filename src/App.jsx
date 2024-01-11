import "./App.css";
import React from "react";
import Sidenav from "./Components/Sidenav";
import Home from "./Pages/Home";
import Aproval from "./Pages/Aprovals";
import { Routes, Route, BrowserRouter } from "react-router-dom";

export default function App() {
  return (
    <>
      <Sidenav />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Homologaciones" element={<Aproval />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
