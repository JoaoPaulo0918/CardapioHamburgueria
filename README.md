🍔 Cat’s Burguer – Cardápio Online com Envio para WhatsApp

Este projeto é um cardápio digital desenvolvido para facilitar pedidos em uma hamburgueria.
O cliente seleciona o hambúrguer, adiciona observação, forma de pagamento e confirma o pedido — que é enviado diretamente para o WhatsApp da loja.

Tudo isso sem backend pesado, sem APIs pagas e com hospedagem gratuita.

🚀 Tecnologias utilizadas

React.js

Vite

TailwindCSS

LocalStorage (para salvar pedidos localmente)

WhatsApp Web Link

JavaScript (ES6)

📱 Funcionalidades
✔️ Exibição de cardápio

O usuário pode navegar pelo cardápio visual com imagens e descrições.

✔️ Montagem do pedido

Escolha do hambúrguer

Escolha do tipo (Simples ou Duplo)

Quantidade

Observações

Forma de pagamento (Dinheiro, Cartão ou Pix)

✔️ Envio do pedido para WhatsApp

O pedido é convertido em uma mensagem formatada e enviado via link direto para o WhatsApp.

✔️ Armazenamento local

Cada pedido é salvo no browser usando localStorage, facilitando:

revisão

impressão

geração de recibo em página individual


🍔 Cat's Burguer - Novo Pedido 🍔
────────────────────────────
🆔 Pedido: {ID}
📅 Data: {DATA}

👤 Cliente:
   Nome: {nome}
   Telefone: {telefone}
   Endereço: {endereco}

🍔 Pedido:
   Item: {hamburguer}
   Tipo: Simples / Duplo
   Quantidade: X
   Total: R$ XX,XX

📝 Observação:
   Nenhuma / {texto}
────────────────────────────
🖨️ Imprima seu recibo:
http://seusite.com/Pedido/{id}

✅ Obrigado pela preferência!


# Instalar dependências
npm install

# Executar projeto
npm run dev

Este projeto é leve e pode ser hospedado gratuitamente em plataformas como:

Vercel

Netlify

GitHub Pages

Objetivo:
Criar um sistema simples, rápido e funcional para pedidos via WhatsApp, sem depender de API oficial ou custos mensais.
Ideal para pequenas hamburguerias que desejam modernizar o atendimento.


Este projeto está sob a licença MIT — sinta-se livre para usar e modificar.
✔️ Página individual do pedido

Cada pedido tem uma URL própria:
