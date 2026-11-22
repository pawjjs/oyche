import * as gameService from '../services/gameService.js';
import { createGameRepository } from '../repositories/gameRepository.js';
import { openDatabase } from '../db.js';

export async function createGame(req, res) {
    const db = openDatabase();
    try {
        const hostId = req.query.hostId;
        const gameRepository = createGameRepository(db);
        const service = gameService.createGameService(gameRepository);

        const game = await service.createGame(hostId);

        console.log('Utworzono pokoj:', game);
        res.status(201).json(game);
    } catch (err) {
        console.error('Blad podczas tworzenia pokoju:', err.message);
        res.status(400).json({ error: err.message });
    }
}

export async function joinGame(req, res) {
    try {
        const db = openDatabase();
        const gameId = req.query.gameId;
        const userId = req.query.userId;

        const gameRepository = createGameRepository(db);
        const service = gameService.createGameService(gameRepository);

        const result = await service.joinGame({ gameId, userId });

        console.log('Gracz dolaczyl do pokoju:', result);
        res.status(200).json(result);
    } catch (err) {
        console.error('Blad podczas dolaczania do pokoju:', err.message);
        res.status(400).json({ error: err.message });
    }
}