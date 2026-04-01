const express = require("express");
const app = express();

app.use(express.json());

// Status da API
app.get("/", (req, res) => {
  res.send("LuxuriaPay API online 💎");
});

// Criar pagamento PIX fake (base)
app.post("/pix", (req, res) => {
  const { valor, nome } = req.body;

  const id = Math.floor(Math.random() * 1000000);

  res.json({
    id,
    status: "pending",
    metodo: "pix",
    valor,
    nome,
    pix_code: "00020126580014BR.GOV.BCB.PIX...",
    mensagem: "Pagamento gerado com sucesso"
  });
});

// Webhook (simulação)
app.post("/webhook", (req, res) => {
  console.log("Webhook recebido:", req.body);
  res.sendStatus(200);
});

app.listen(3000, () => console.log("LuxuriaPay rodando 🚀"));
