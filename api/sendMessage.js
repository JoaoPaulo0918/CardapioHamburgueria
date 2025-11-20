export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método não permitido" });
    }

    const { phone, message } = req.body;

    if (!phone || !message) {
        return res.status(400).json({ error: "Faltando dados: phone ou message" });
    }

    try {
        const token = process.env.WHATSAPP_TOKEN;
        const phoneId = process.env.WHATSAPP_PHONE_ID;

        const url = `https://graph.facebook.com/v20.0/${phoneId}/messages`;

        const payload = {
            messaging_product: "whatsapp",
            to: phone,
            type: "text",
            text: { body: message }
        };

        const resposta = await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const data = await resposta.json();

        if (data.error) {
            console.error("Erro do Meta API:", data.error);
            return res.status(500).json({ error: data.error });
        }

        return res.status(200).json({ success: true, response: data });

    } catch (erro) {
        console.error("Erro geral:", erro);
        return res.status(500).json({ error: "Erro interno ao enviar mensagem" });
    }
}
