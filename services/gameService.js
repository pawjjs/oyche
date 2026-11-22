
export function createGameService(gameRepository) {
    return{
        async createGame(hostId){
            const game = await gameRepository.create({hostId, status: 'waiting'});

            await gameRepository.addPlayer({ gameId: game.id, userId: hostId, color: ''});

            return game;
        },

        async joinGame ({gameId, userId}){
            const game = await gameRepository.findById(gameId);
            const players = await gameRepository.getPlayers(gameId);

            const player = await gameRepository.addPlayer({
                gameId,
                userId,
                color: '',
            });

            return player;
        }
    }
}

