import {Router} from "express";
import {newGame, joinGame, startGame} from "../controllers/gameController.js";

const router = Router();

// GET /newGame
router.get("/newGame", newGame);

// GET /game/KOD/join
router.get("/game/:id/join", joinGame);

// GET /game/KOD/start
router.get("/game/:id/start", startGame);

export default router;