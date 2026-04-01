const express = require("express");
const mercadopago = require("mercadopago");

const app = express();
app.use(express.json());

// CONFIG MERCADO PAGO
mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN
});

// STATUS
app.get("/", (req, res) => {
  res.send("LuxuriaPay PIX automático 💎");
});

// GERAR PIX
app.post("/pix", async (req, res) => {
  try {
    const { valor, nome } = req.body;

    const payment = await mercadopago.payment.create({
      transaction_amount: Number(valor),
      description: "Pagamento LuxuriaPay",
      payment_method_id: "pix",
      payer: {
        email: "teste@email.com",
        first_name: nome
      }
    });

    const dados = payment.body.point_of_interaction.transaction_data;

    res.json({
      status: payment.body.status,
      valor: valor,
      qr_code: dados.qr_code_base64,
      copia_cola: dados.qr_code
    });

  } catch (erro) {
    res.status(500).json({
      erro: erro.message
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("LuxuriaPay PIX rodando 🚀");
});
