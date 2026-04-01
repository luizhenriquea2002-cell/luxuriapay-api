const express = require("express");
const app = express();

app.use(express.json());

// rota principal
app.get("/", (req, res) => {
  res.send("LuxuriaPay API online 💎");
});

// MUITO IMPORTANTE 👇
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Servidor rodando na porta " + PORT);
});
