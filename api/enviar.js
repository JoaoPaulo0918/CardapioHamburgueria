export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método não permitido" });
    }

    const { cliente, pedido, linkImpressao } = req.body;

    const token = process.env.WHATSAPP_TOKEN;
    const phoneId = process.env.WHATSAPP_PHONE_ID;
    const numeroDestino = "5581933008837"; // Seu WhatsApp

    const mensagem = `
🍔 *Cat's Burguer - Novo Pedido* 🍔
────────────────────────────
🆔 Pedido: ${pedido.id} 
📅 Data: ${pedido.data}

👤 Cliente:
- Nome: ${cliente.nome}
- Telefone: ${cliente.telefone}
- Endereço: ${cliente.endereco}

🍔 Pedido:
- Item: ${pedido.nome}
- Tipo: ${pedido.tipo}
- Quantidade: ${pedido.quantidade}
- Total: R$ ${pedido.total}

📝 Observação:
${pedido.observacao || "Nenhuma"}

🖨️ Imprimir pedido:
${linkImpressao}
`;

    try {
        const enviar = await fetch(
            `https://graph.facebook.com/v19.0/${phoneId}/messages`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    messaging_product: "whatsapp",
                    to: numeroDestino,
                    type: "text",
                    text: { body: mensagem },
                }),
            }
        );

        const resposta = await enviar.json();
        return res.status(200).json({ ok: true, resposta });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
