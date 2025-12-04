import React from "react";
import { Route, Routes } from "react-router-dom";
import Cardapio from "./Cardapio";
import Home from "./Home";
import Pedido from "./Pedido";
import Sobre from "./Sobre"
import './index.css'


function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Cardapio" element={<Cardapio key={Date.now()} />} />
      <Route path="/pedido" element={<Pedido />} />
      <Route path="/Sobre" element={<Sobre />} />
    </Routes>
  );
}

export default RoutesApp;
