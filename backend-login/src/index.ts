import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.routes";

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rotas
app.use("/api/auth", authRoutes);

// Inicialização do servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
