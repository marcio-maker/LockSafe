import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.use("/api/auth", authRoutes); // a rota que o frontend usa

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Backend rodando na porta ${PORT}`));
