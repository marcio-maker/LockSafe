import { Router } from "express";
import { getUsers } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = Router();

router.get("/usuarios", authMiddleware, getUsers);

export default router;
