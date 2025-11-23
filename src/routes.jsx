import React from "react";
import { Route, Routes } from "react-router-dom";
import Cardapio from "./cardapio";
import Home from "./Home";
import Pedido from "./Pedido";
import './index.css'


function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cardapio" element={<Cardapio key={Date.now()} />} />
      <Route path="/pedido/:id" element={<Pedido />} />
    </Routes>
  );
}

export default RoutesApp;
