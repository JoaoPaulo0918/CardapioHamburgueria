import React from "react";
import { Route, Routes } from "react-router-dom";
import Cardapio from "./Cardapio";
import Home from "./Home";
import Pedido from "./Pedidos";
import './index.css'


function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Cardapio" element={<Cardapio key={Date.now()} />} />
      <Route path="/pedidos/:id" element={<Pedido />} />
    </Routes>
  );
}

export default RoutesApp;
