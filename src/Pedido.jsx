import React from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";


export default function Pedido() {


  //Deixa fundo branco
  useEffect(() => {
    const old = document.body.style.background;
    document.body.style.background = "white"; // fundo limpo

    return () => {
      document.body.style.background = old; // restaura ao sair
    };
  }, []);

  const [params] = useSearchParams();
  const encoded = params.get("d");

  const pedido = encoded ? JSON.parse(atob(encoded)) : null;


  if (!pedido) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">
        <h1 className="text-xl font-bold">Pedido não encontrado</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">

        {/* Título */}
        <h2 className="text-2xl font-bold text-center mb-4">
          🍔 Cat's Burguer
        </h2>

        <p><b>ID Pedido:</b> {pedido.id}</p>
        <p><b>Data:</b> {pedido.data}</p>

        <hr className="my-3 border-dashed border-black" />

        {/* Cliente */}
        <h3 className="font-bold mt-2">Cliente</h3>
        <p><b>Nome:</b> {pedido.cliente.nome}</p>
        <p><b>Telefone:</b> {pedido.cliente.telefone}</p>
        <p><b>Endereço:</b> {pedido.cliente.endereco}</p>

        <hr className="my-3 border-dashed border-black" />

        {/* Pedido */}
        <h3 className="font-bold mt-2">Pedido</h3>
        <p><b>Item:</b> {pedido.nome}</p>
        <p><b>Tipo:</b> {pedido.tipo}</p>
        <p><b>Quantidade:</b> {pedido.quantidade}</p>
        <p><b>Total:</b> R$ {pedido.total}</p>
        <p><b>Forma de Pagamento:</b> {pedido.pagamento}</p>
        <p><b>Observação:</b> {pedido.observacao || "Nenhuma"}</p>

        <hr className="my-3 border-dashed border-black" />

        {/* Botão de Impressão */}
        <button
          className="w-full bg-black text-white py-2 mt-4 rounded-lg hover:bg-gray-800 transition"
          onClick={() => window.print()}
        >
          Imprimir Recibo
        </button>

      </div>
    </div>
  );
}
