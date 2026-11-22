function toGame(row) {
    if (!row) return null;
    return {
        id: row.id,
        hostId: row.host_id,
        status: row.status,
    };
}

export function createGameRepository(db) {
    const insertGame = db.prepare('INSERT INTO games (host_id, status) VALUES (?, ?)');
    const findGameById = db.prepare('SELECT id, host_id, status FROM games WHERE id = ?');
    const findPlayersByGameId = db.prepare('SELECT user_id, color FROM game_players WHERE game_id = ?');
    const insertPlayer = db.prepare(`
        INSERT INTO game_players (game_id, user_id, color)
        VALUES (?, ?, ?)
    `);

    return {
        async create({ hostId, status = 'waiting' }) {
            const { lastInsertRowid } = insertGame.run(hostId, status);
            return toGame(findGameById.get(lastInsertRowid));
        },

        async addPlayer({ gameId, userId, color = ' ' }) {
            insertPlayer.run(gameId, userId, color);
            return { gameId, userId, color };
        },

        async findById(gameId) {
            return toGame(findGameById.get(gameId));
        },

        async getPlayers(gameId) {
            return findPlayersByGameId.all(gameId);
        },
    };
}