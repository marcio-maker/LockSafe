import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:3000" }));
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/api/health", (req, res) => res.json({ status: "OK", message: "Backend funcionando!" }));

app.use("*", (req, res) => res.status(404).json({ error: "Rota não encontrada" }));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Erro interno do servidor" });
});

export default app;
