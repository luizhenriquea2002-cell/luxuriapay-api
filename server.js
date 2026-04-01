const API_KEY = "luxuria_123"; // depois vamos automatizar

// middleware de proteção
app.use((req, res, next) => {
  const key = req.headers["x-api-key"];

  if (key !== API_KEY) {
    return res.status(401).json({ erro: "Não autorizado" });
  }

  next();
});
