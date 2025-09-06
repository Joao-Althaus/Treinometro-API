import express from "express";

const app = express();

app.get("/healthcheck", (req, res) => {
  res.send("API ta funcionando");
});

app.listen(3000, () => {
  console.log("🔥 Servidor rodando na porta 3000");
});


