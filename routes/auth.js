import {Router} from "express";
import {register} from "../controllers/authController.js";

const router = Router();

// POST /register
router.post("/register", register);

export default router;