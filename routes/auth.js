import {Router} from "express";
import {register, login, logout} from "../controllers/authController.js";

const router = Router();

// POST /register
router.post("/register", register);

// POST /login
router.post("/login", login);

// POST /logout
router.post("/logout", logout);

export default router;