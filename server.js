const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

const users = [
  { email: "admin@luxuria.com", password: "123456" }
];

// LOGIN
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ error: "Credenciais inválidas" });
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1d"
  });

  res.json({ token });
});

// MIDDLEWARE AUTH
function auth(req, res, next) {
  const token = req.headers.authorization;

  if (!token) return res.sendStatus(401);

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.sendStatus(403);
  }
}

// DADOS DASHBOARD
app.get("/dashboard", auth, (req, res) => {
  res.json({
    saldo: 128450,
    receitaHoje: 12840,
    transacoes: 1245,
    conversao: 94
  });
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor PRO rodando 🚀 na porta " + PORT);
});
app.get("/dashboard", (req, res) => {
  res.sendFile(__dirname + "/dashboard.html");
});
