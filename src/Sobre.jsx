import React from "react";
import {Link} from "react-router-dom"

import { HiArrowLeft } from "react-icons/hi";

export default function Sobre() {
    
    return (

        //Div principal
        <div className="flex w-full text-white/70 flex-col justify-center font-sans p-6 gap-5 ">

            {/*Button para voltar*/}
            <button
                className=" bg-white/10 rounded-full w-8 h-8 flex items-center justify-center"
            > <Link to="/"><HiArrowLeft size={18} /></Link>
            </button>

            {/*Titulo*/}
            <h1 className="text-xl sm:text-2xl text-center mb-4 md:text-3xl lg:text-4xl text-amber-200">Sobre a Cat's Burguer</h1>

            {/*texto sobre a hamburgueria*/}
            <p className=" flex  text-xl sm:text-2xl md:text-3xl lg:text-4xl text-justify">
                A Cat’s Burguer nasceu em 2022 com a proposta de levar hambúrgueres artesanais de alta qualidade para seus clientes. Desde o início, a hamburgueria prioriza ingredientes frescos, preparo cuidadoso e sabores exclusivos.

                Atualmente, a Cat’s Burguer opera exclusivamente no formato delivery, oferecendo praticidade sem abrir mão do sabor e da qualidade artesanal. Com um cardápio variado e receitas próprias, a marca conquistou seu espaço atendendo quem busca uma experiência diferente e feita com capricho.
            </p>

        </div>
    )
}