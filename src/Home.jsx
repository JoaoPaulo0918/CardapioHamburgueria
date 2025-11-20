import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { TimerIcon } from "lucide-react";
import { CircleDollarSign } from "lucide-react";
import { useTypewriter, Cursor } from 'react-simple-typewriter';

import imagens from "../src/dados/img/img"

function Home() {
    const [popupCliente, setPopupCliente] = useState(false);
    const [mensagemPopup, setMensagemPopup] = useState("");
    const [cliente, setCliente] = useState({ nome: "", telefone: "", endereco: "" });
    const [dadosPreenchidos, setDadosPreenchidos] = useState(false);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate()


    //Função usada para digitação automatica 
    function useTypewriter(text, speed = 40) {
        const [output, setOutput] = useState("");
        const timerRef = useRef(null);
        const indexRef = useRef(0);

        useEffect(() => {
            // limpa qualquer timer anterior
            if (timerRef.current) {
                clearTimeout(timerRef.current);
                timerRef.current = null;
            }

            if (!text) {
                setOutput("");
                return;
            }

            // opcional: remove espaços iniciais se quiser
            const cleanText = String(text);

            // reinicia estado
            setOutput("");
            indexRef.current = 0;

            // função que digita um caractere e agenda o próximo
            const tick = () => {
                // pega o caractere atual
                const i = indexRef.current;
                setOutput((prev) => prev + (cleanText.charAt(i) || ""));

                indexRef.current = i + 1;

                if (indexRef.current < cleanText.length) {
                    timerRef.current = setTimeout(tick, speed);
                } else {
                    timerRef.current = null; // terminou
                }
            };

            // dispara imediatamente o primeiro caractere (evita "letra 1 sumir")
            tick();

            return () => {
                if (timerRef.current) {
                    clearTimeout(timerRef.current);
                    timerRef.current = null;
                }
            };
        }, [text, speed]);

        return output;
    }

    const textoDigitadoPopup = useTypewriter(mensagemPopup, 35);

    //variavel para abrir popup
    const abrirCardapio = () => {
        if (!dadosPreenchidos) {
            setMensagemPopup("Digite seus dados")
            setPopupCliente(true); // abre o popup
        } else {
            // redirecionar para Cardápio usando navigate e passando os dados já preenchidos
            navigate("/Cardapio", { state: { cliente } });
        }

    };

    //variável recebendo e validando os dados
    const confirmarDadosCliente = () => {
        if (!cliente.nome || !cliente.telefone || !cliente.endereco) {
            setMensagemPopup("Por favor! preencha todos os campos")
            return;
        }
        setDadosPreenchidos(true);
        setPopupCliente(false);
        navigate("/Cardapio", { state: { cliente } });// Redireciona para Cardápio enviando os dados do cliente
    };


    return (
        <>

            {/* div geral*/}
            <div className="flex w-screen h-full font-sans py-5 px-4 justify-center bg-orange-950">

                <nav className="fixed top-0 w-full h-14 bg-orange-950 px-6 flex items-center justify-between z-[9] shadow">

                    {/* Ícone Hamburguer */}
                    <div onClick={() => setOpen(true)} className="space-y-1.5 cursor-pointer outline outline-red-500">
                        <span className="block w-7 h-[3px] bg-white"></span>
                        <span className="block w-7 h-[3px] bg-white"></span>
                        <span className="block w-7 h-[3px] bg-white"></span>
                    </div>

                    {/* Títulos */}
                    <div className="text-center flex flex-col leading-4">
                        <p className="text-sm text-white">catsburguer.home</p>
                        <p className="text-xs text-white/20">@catsburguer</p>
                    </div>

                    {/* Espaço para equilibrar */}
                    <div className="w-6"></div>
                </nav>

                <nav className="flex top-52 w-full h-14 bg-orange-500 px-6 items-center justify-around z-[99] shadow">

                    {/* Ícone Hamburguer */}
                   

                    {/* Títulos */}
                    <div className="text-center flex flex-col leading-4">
                        <p className="text-sm text-white">catsburguer.home</p>
                        <p className="text-xs text-white/20">@catsburguer</p>
                    </div>

                    {/* Espaço para equilibrar */}
                     <div onClick={() => setOpen(true)} className="space-y-1.5 cursor-pointer ">
                        <span className="block w-7 h-[3px] bg-amber-800"></span>
                        <span className="block w-7 h-[3px] bg-amber-800"></span>
                        <span className="block w-7 h-[3px] bg-amber-800"></span>
                    </div>
                </nav>


                {/* OVERLAY */}
                {open && (
                    <div
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-10"
                        onClick={() => setOpen(false)}
                    ></div>
                )}

                {/* MENU LATERAL */}
                <div
                    className={`fixed top-0 left-0 h-full gap-5 w-64 bg-white shadow-xl z-50 p-6 transform transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"
                        }`}
                >
                    {/* Botão fechar */}
                    <button
                        onClick={() => setOpen(false)}
                        className="text-gray-700 text-xl mb-6"
                    >
                        ✕
                    </button>

                    {/* Conteúdo do Menu */}
                    <ul className="space-y-4 text-lg">

                        <li><Link to="/" className="cursor-pointer hover:text-red-600 transition">Home</Link></li>
                        <li><Link className="cursor-pointer hover:text-red-600 transition" onClick={abrirCardapio}>Cardápio</Link></li>
                        {/*<li className="cursor-pointer hover:text-red-600 transition">Promoções</li>*/}
                        <li className="cursor-pointer hover:text-red-600 transition"><a
                            href="https://wa.me/5581996050024"
                            target="_blank"
                            rel="noopener noreferrer"
                            className=""
                        >Contato
                        </a></li>
                        <li className="cursor-pointer hover:text-red-600 transition">Sobre</li>
                    </ul>

                    {/*div de desenvolvedor*/}
                    <div className="w-full h-full flex py-10 items-center justify-center">

                        <p className="text-black/70 sm:h-20 flex lg:mt-32 md:mt-48 sm:mt-48 ">@jpdev2025</p>

                    </div>

                </div>


                {/* Conteúdo principal */}
                <div className="flex flex-col mt-9 h-full w-full  rounded-2xl text-orange-950 items-center gap-3 lg:gap-5">

                    <div className="relative flex w-full px-4 h-56">
                        {/* imagem hamburguer */}
                        <img className=" w-full h-full object-cover rounded-xl" src={imagens.duploCheddar} alt="" />
                    </div>

                    {/* div informações */}
                    <div className="  w-full h-40 px-4 py-2 flex flex-col items-center gap-2 mb-10 mt-0">

                        {/* imagem logo*/}
                        <div className="flex w-20 h-20 rounded-full -mt-7 ">
                            <img className="w-20 h-20 object-cover rounded-full border border-white/10 -mt-5 z-50" src={imagens.Logo} alt="" />
                        </div>

                        {/* titulo */}
                        <h1 className="text-2xl font-extrabold text-center text-white mt-5">Cat's Hamburgueria</h1>

                        {/* div conteúdos informativos */}
                        <div className="w-full flex justify-center gap-2 mb-2">
                            <p className="flex gap-1 text-sm text-white/20 items-center">
                                <TimerIcon className="w-4 h-4 text-white/20" /> 25-30min
                            </p>
                            <p className="flex gap-1 text-sm items-center text-white/20">
                                <CircleDollarSign className="w-4 h-4 text-white/20" /> Mínimo
                                <span className="font-bold text-white/20"> R$ 18,00</span>
                            </p>
                        </div>

                        {/* botoes com logos*/}
                        <div className="flex gap-3 mt-5">
                            {/* logo whatsapp*/}
                            <a
                                href="https://wa.me/5581996050024"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-black/10 rounded-full text-green-500 hover:bg-green-500/30 transition-all"
                            >
                                <FaWhatsapp className="text-2xl" />
                            </a>

                            {/* logo instagram*/}
                            <a
                                href="https://instagram.com/catsburguer__/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-black/10 rounded-full text-pink-500 hover:bg-pink-500/30 transition-all"
                            >
                                <FaInstagram className="text-2xl" />
                            </a>

                        </div>

                        {/* frase apresentativa*/}
                        <div className="w-full flex text-xl text-center lg:text-center sm:text-2x">
                            <p className="w-full sm:mb-8 mb-5 md:mt-4 text-white ">Venha experimentar o melhor hamburguer artesanal da região!</p>
                        </div>

                    </div>

                    {/* div botões cardápio e whatsapp*/}
                    <div className=" w-2xl h-48 px-4 py-3 flex flex-col justify-center items-center gap-3 mt-9 mb-8 sm:mt-14 sm:mb-4">

                        {/* botão cardápio*/}
                        <button
                            onClick={abrirCardapio}
                            className="w-full h-14 bg-white border border-white/30 text-black cursor-pointer transition-all duration-300 ease-in-out hover:bg-orange-300 hover:scale-[1.03] hover:shadow-lg mt-5"
                        >
                            Cardápio
                        </button>

                        {/* botão whatsapp*/}
                        <a
                            href="https://wa.me/5581996050024"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full h-14"
                        >
                            <button className="w-full h-14 bg-lime-500 border border-white/30 text-black  cursor-pointer transition-all duration-300 ease-in-out hover:bg-orange-300 hover:scale-[1.03] hover:shadow-lg">WhatsApp</button>
                        </a>

                    </div>

                    {/* div informações relevantes*/}
                    <div className="w-full flex gap-2 justify-center mt-4 sm:mt-0 md:mt-40 text-sm text-white/20">
                        <p>Definições de cookies</p>

                        <span className="mt-1">°</span>

                        <p>Report</p>

                        <span className="mt-1">°</span>

                        <p>Privacy</p>
                    </div>


                    {/*Popup dos dados */}
                    {popupCliente && (
                        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
                            <div className="bg-white rounded-2xl p-6 w-96 flex flex-col gap-4 relative">

                                {/* BOTÃO DE FECHAR */}
                                <button
                                    className="absolute top-3 right-3 bg-black/40 border border-white/20 rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/60 transition"
                                    onClick={() => setPopupCliente(false)}
                                >
                                    <FiX size={20} className="text-white" />
                                </button>

                                {/* MENSAGEM DIGITADA */}
                                {textoDigitadoPopup && (
                                    <p className="text-orange-950 text-lg my-4 font-medium">
                                        {textoDigitadoPopup}
                                        <span className="animate-pulse">|</span>
                                    </p>
                                )}


                                {/*input dados nome*/}
                                <input
                                    type="text"
                                    placeholder="Nome"
                                    className="w-full p-2 rounded-lg text-orange-950 bg-black/50 border border-white/10 "
                                    value={cliente.nome}
                                    onChange={(e) => setCliente({ ...cliente, nome: e.target.value })}
                                />

                                {/*input dados telefone*/}
                                <input
                                    type="text"
                                    placeholder="Telefone ex: 81 99999-9999"
                                    className="w-full p-2 rounded-lg bg-black/50 text-orange-950 border border-white/10"
                                    value={cliente.telefone}
                                    onChange={(e) => setCliente({ ...cliente, telefone: e.target.value })}
                                />

                                {/*input dados endereço*/}
                                <input
                                    type="text"
                                    placeholder="Endereço ex: rua, bairro, numero"
                                    className="w-full p-2 rounded-lg bg-black/50 text-orange-950 border border-white/10"
                                    value={cliente.endereco}
                                    onChange={(e) => setCliente({ ...cliente, endereco: e.target.value })}
                                />

                                {/*butão para salvar os dados*/}
                                <button
                                    onClick={confirmarDadosCliente}
                                    className="w-full py-3 bg-orange-950 text-white rounded-xl hover:scale-105 transition mt-5"
                                >
                                    Confirmar
                                </button>
                            </div>
                        </div>
                    )}


                </div>
            </div >
        </>
    )
}

export default Home