import express from 'express';
import { createGame, joinGame } from '../controllers/gameController.js';

const router = express.Router();

router.get('/', createGame);
router.get('/join', joinGame);
export default router;