import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import hamburgueres from "./dados/hamburgueres";
import { Search } from "lucide-react";
import { motion } from "framer-motion";


// Icons
import { HiArrowLeft } from "react-icons/hi";
import { FiMaximize, FiX } from "react-icons/fi";


export default function Cardapio() {
    const location = useLocation();
    const cliente = location.state?.cliente || null;
    const [filtro, setFiltro] = useState("");
    const [popupOpen, setPopupOpen] = useState(false);
    const [hamburguerSelecionado, setHamburguerSelecionado] = useState(null);
    const [quantidade, setQuantidade] = useState(1);
    const [tipo, setTipo] = useState("simples");
    const [observacao, setObservacao] = useState("");
    const [zoom, setZoom] = useState(false);
    const [precoAtual, setPrecoAtual] = useState(0);
    const [pagamento, setPagamento] = useState("");

    //variável para finção popup
    const abrirPopup = (item) => {
        setHamburguerSelecionado(item);
        setQuantidade(1);
        setTipo("simples");
        setObservacao("");
        setPopupOpen(true);
    };

    const fecharPopup = () => {
        setPopupOpen(false);
        setHamburguerSelecionado(null);
    };

    //Função para digitação de texto automática
    function useTypewriter(text, speed = 40) {
        const [display, setDisplay] = useState("");

        useEffect(() => {
            setDisplay("");
            let i = 0;

            const interval = setInterval(() => {
                setDisplay(text.slice(0, i));
                i++;
                if (i > text.length) clearInterval(interval);
            }, speed);

            return () => clearInterval(interval);
        }, [text]);

        return display;
    }

    //efeito para saber tipo de hamburguer
    useEffect(() => {
        if (hamburguerSelecionado) {
            const preco =
                tipo === "simples"
                    ? Number(hamburguerSelecionado.valorSimples.replace(",", "."))
                    : Number(hamburguerSelecionado.valorDuplo.replace(",", "."));
            setPrecoAtual(preco);
        }
    }, [tipo, hamburguerSelecionado]);


    const aumentar = () => setQuantidade((q) => q + 1);
    const diminuir = () => setQuantidade((q) => Math.max(1, q - 1));

    //Confirmação do pedido
   const confirmarPedido = () => {
    if (!hamburguerSelecionado || !cliente) {
        alert("Erro: Dados do cliente ou do pedido faltando!");
        return;
    }

    const precoUnitario =
        tipo === "simples"
            ? Number(hamburguerSelecionado.valorSimples.replace(",", "."))
            : Number(hamburguerSelecionado.valorDuplo.replace(",", "."));
    const total = (precoUnitario * quantidade).toFixed(2).replace(".", ",");

    const pedidoId = "PED-" + Date.now();

    const pedidoObj = {
        id: pedidoId,
        cliente,
        nome: hamburguerSelecionado.nome,
        tipo: tipo === "simples" ? "Simples" : "Duplo",
        quantidade,
        total,
        observacao,
        pagamento,
        data: new Date().toLocaleString(),
    };

    localStorage.setItem(`pedido-${pedidoId}`, JSON.stringify(pedidoObj));

    const linkImpressao = `https://cardapio-hamburgueria-amber.vercel.app/Pedido/${pedidoId}`;

    // 📌 MONTAR MENSAGEM
    const mensagem = `
🍔 *Cat's Burguer - Novo Pedido* 🍔

🆔 Pedido: ${pedidoObj.id}
📅 Data: ${pedidoObj.data}

👤 Cliente:
- Nome: ${cliente.nome}
- Telefone: ${cliente.telefone}
- Endereço: ${cliente.endereco}

🍔 Pedido:
- Item: ${pedidoObj.nome}
- Tipo: ${pedidoObj.tipo}
- Quantidade: ${pedidoObj.quantidade}
- Total: R$ ${pedidoObj.total}

📝 Observação:
${pedidoObj.observacao || "Nenhuma"}

🖨️ Imprimir pedido:
${linkImpressao}
    `;

    // 🔗 Enviar via WhatsApp Web
    const numero = "5581933008837"; // número para onde vai o pedido

    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

    // Abre o WhatsApp Web com a mensagem
    window.open(url, "_blank");
};




    const listaHamburgueres = Object.values(hamburgueres);

    //Filtro para buscar
    const resultado = listaHamburgueres.filter((h) => {
        return (
            h.nome?.toLowerCase().includes(filtro.toLowerCase()) ||
            h.descricao?.toLowerCase().includes(filtro.toLowerCase())
        );
    });


    // Mensagem dinâmica
    const mensagemAuto = resultado.length
        ? "Olá " + cliente.nome + ", aqui está o nosso cardápio:"
        : filtro.trim() !== ""
            ? "Não encontrei esse hambúrguer\nno cardápio, tente outro nome!"
            : "";

    const textoDigitado = useTypewriter(mensagemAuto, 35);


    return (

        //div geral
        <div className="min-h-screen bg-gradient-to-b from-orange-950 via-orange-950 to-black text-white py-3 flex flex-col gap-4">

            {/* navbar */}
            <nav className="fixed top-0 w-full h-14 px-3 flex border border-amber-50/10 items-center justify-between z-20 shadow">

                {/*icon seta voltar*/}
                <button
                    className=" bg-white/10 rounded-full w-8 h-8 flex items-center justify-center"
                    onClick={fecharPopup}
                > <Link to="/"><HiArrowLeft size={18} /></Link>
                </button>

                {/* input com icon search*/}
                <div className="flex relative">
                    <input type="search" className="w-2xs h-8 justify-center px-7 border border-white/30 rounded-2xl" value={filtro} onChange={(e) => setFiltro(e.target.value)} />
                    <Search className="w-5 h-5 mt-1.5 ml-1 cursor-pointer absolute text-white/30" />
                </div>

            </nav>

            {/* div topo*/}
            <div className="w-full flex justify-center mt-8">

                {/* Título */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-center text-amber-200 mb-10 mt-4 drop-shadow-md">
                    🍔 Cat's Burguer Cardápio
                </h1>

            </div>

            {/*div cards conteudos*/}
            <div className="flex flex-col gap-8 max-w-5xl mx-auto">

                {/* MENSAGEM DIGITADA */}
                {textoDigitado && (
                    <div className="w-full text-justify px-4">
                        <p className="text-white text-lg my-4 font-medium whitespace-pre-line">
                            {textoDigitado}
                            <span className="animate-pulse">|</span>
                        </p>
                    </div>

                )}

                {/*resultados encontrados*/}
                {resultado.length ? (
                    resultado.map((item, index) => (
                        <div
                            key={index}
                            className="border border-white/30 p-4 rounded-2xl shadow-lg flex flex-col md:flex-row items-center gap-4"
                        >
                            <div className="w-full md:w-1/6 h-40 md:h-24 bg-black overflow-hidden flex items-center justify-center">
                                <img src={item.imagem} className="w-full h-full object-cover" />
                            </div>

                            {/*Conteúdo*/}
                            <div className="space-y-2 w-full">
                                {/* TÍTULO E PREÇOS */}
                                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-1">

                                    <h2 className="text-xl sm:text-2xl font-bold text-amber-200 break-words">{item.nome}</h2>

                                    <div className="text-sm sm:text-base text-green-200">
                                        <p>Simples: R$ {item.valorSimples}</p>
                                        {item.valorDuplo && <p>Duplo: R$ {item.valorDuplo}</p>}
                                    </div>

                                </div>


                                {/* DESCRIÇÃO */}
                                <p className="text-gray-400 italic text-sm sm:text-base break-words">{item.descricao}</p>


                                {/* BOTÃO */}
                                <button
                                    onClick={() => abrirPopup(item)}
                                    className="w-full sm:w-40 p-2 bg-black/30 border border-cyan-500/20 text-white rounded-xl backdrop-blur-sm hover:scale-105 transition cursor-pointer"
                                >
                                    Fazer Pedido
                                </button>

                            </div>
                        </div>
                    ))
                ) : (

                    //mensagemquando não tem hamburguer achado
                    <div className="w-full flex justify-center">
                        <p className="text-red-300">Nenhum hambúrguer encontrado</p>
                    </div>
                )}

            </div>


            {/* POPUP */}
            {popupOpen && hamburguerSelecionado && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center sm:px-1 items-center z-50 h-full gap-4">
                    {/* ZOOM */}
                    {zoom && (
                        <div
                            className="fixed inset-0 bg-black/80 flex justify-center items-center cursor-pointer z-[60]"
                            onClick={() => setZoom(false)}
                        >
                            <img
                                src={hamburguerSelecionado.imagem}
                                className="w-[90%] max-w-lg rounded-xl"
                            />
                        </div>
                    )}

                    {/* div geral popup*/}
                    <div className=" bg-white/20 rounded-2xl shadow-2xl w-80 border sm:w-full border-white/20 relative">
                        {/* IMAGEM */}
                        <div className="relative w-full h-52 overflow-hidden rounded-t-2xl">
                            <button
                                className="absolute top-3 left-3 bg-orange-950 rounded-full w-8 h-8 flex items-center justify-center"
                                onClick={fecharPopup}
                            >
                                <HiArrowLeft size={18} />
                            </button>

                            <button
                                className="absolute top-3 right-3 bg-black/40 border border-white/20 rounded-full w-8 h-8 flex items-center justify-center"
                                onClick={() => setZoom(true)}
                            >
                                <FiMaximize size={18} className="text-white" />
                            </button>

                            <img
                                src={hamburguerSelecionado.imagem}
                                className="w-full h-full object-cover"
                            />

                        </div>

                        {/*Zoom da imagem */}
                        {zoom && (
                            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                                <button
                                    className="absolute top-5 right-5 bg-white/50 border border-white/20 rounded-full w-10 h-10 flex items-center justify-center"
                                    onClick={() => setZoom(false)}
                                >
                                    <FiX size={22} className="text-white" />
                                </button>
                                <img
                                    src={hamburguerSelecionado.imagem}
                                    className="max-w-[90%] max-h-[90%] object-cover rounded-2xl"
                                />
                            </div>
                        )}

                        {/* TÍTULO */}
                        <h2 className="text-bse sm:text-2xl font-bold text-white mt-3 ml-3">
                            {hamburguerSelecionado.nome}
                        </h2>

                        {/* DESCRIÇÃO */}
                        <p className="text-gray-300 text-justify text-base line-clamp-2 px-3 mt-4 mb-5">
                            {hamburguerSelecionado.descricao}
                        </p>

                        {/* TIPO */}
                        <div className="flex justify-around mt-5 px-3">
                            {hamburguerSelecionado.valorSimples && (
                                <button
                                    className={`px-4 py-2 rounded-xl ${tipo === "simples" ? "bg-orange-950" : "bg-black/30"
                                        }`}
                                    onClick={() => setTipo("simples")}
                                >
                                    Simples
                                </button>
                            )}

                            {hamburguerSelecionado.valorDuplo && (
                                <button
                                    className={`px-4 py-2 rounded-xl ${tipo === "duplo" ? "bg-orange-950" : "bg-black/30"
                                        }`}
                                    onClick={() => setTipo("duplo")}
                                >
                                    Duplo
                                </button>
                            )}
                        </div>

                        {/* OBSERVAÇÃO */}
                        <div className="px-3 h-24 mt-7 mb-4 sm:mb-0 ">
                            <textarea
                                className="w-full h-20 bg-black/20 border border-white/20 text-white rounded-xl p-2 outline-none"
                                placeholder="Alguma observação?"
                                value={observacao}
                                onChange={(e) => setObservacao(e.target.value)}
                            />
                        </div>

                        {/* CONTADOR + PREÇO */}
                        <div className="flex justify-between items-center px-3 sm:-mt-2 mt-7 w-full">
                            <p className="text-white w-full text-lg font-bold sm:-mt-3 ">
                                R$ {(precoAtual * quantidade).toFixed(2).replace(".", ",")}
                            </p>

                            <div className="w-full flex justify-end gap-2">
                                <button
                                    className="w-8 h-8 bg-black/40 rounded-full"
                                    onClick={diminuir}
                                >
                                    -
                                </button>

                                <span className="text-xl">{quantidade}</span>

                                <button
                                    className="w-8 h-8 bg-orange-950 rounded-full"
                                    onClick={aumentar}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <div className="w-full flex flex-col text-center gap-1">
                            <h2>Escolha a forma de pagamento</h2>

                            <div className="flex w-full justify-center gap-3">

                                <div onClick={() => setPagamento("dinheiro")} className={`flex w-full justify-center gap-3 cursor-pointer ${pagamento === "dinheiro" ? "bg-orange-950 text-white" : ""}`}>
                                    <p>Dinheiro</p>
                                </div>

                                <div onClick={() => setPagamento("cartao")} className={`flex w-full justify-center gap-3 cursor-pointer ${pagamento === "cartao" ? "bg-orange-950 text-white" : ""}`}>
                                    <p>Cartão</p>
                                </div>

                                <div onClick={() => setPagamento("pix")} className={`flex w-full justify-center gap-3 cursor-pointer ${pagamento === "pix" ? "bg-orange-950 text-white" : ""}`}>
                                    <p>Pix</p>
                                </div>
                            </div>

                        </div>

                        {/* CONFIRMAR */}
                        <button
                            onClick={confirmarPedido}
                            className="w-full bg-orange-600 py-3 text-white mt-5 rounded-b-2xl hover:scale-105 transition cursor-pointer"
                        >
                            Confirmar Pedido
                        </button>

                    </div>

                </div>
            )}
        </div>
    );
}
