import * as gameService from "../services/gameService.js";

export function newGame(req, res) {
    const newGame = gameService.newGame();

    if (!newGame) {
        // Status 400 Bad Request
        return res.status(400).json({
            error: {
                code: "GAME_CREATION_FAILED",
                message: "Nie udało się utworzyć gry."
            }
        });
    }

    // Status 201 Created
    res.status(201).json(newGame);
}

export function joinGame(req, res){
    const {id} = req.params;
    const gameToJoin = gameService.joinGame(id);

    if(!gameToJoin){
        // Status 400 Bad Request
        return res.status(400).json({
            error: {
                code: "GAME_JOIN_FAILED",
                message: "Nie udało się dołączyć do gry."
            }
        })
    }

    // Status 200 OK
    res.status(200).json(gameToJoin);
}

export function startGame(req, res){
    const {id} = req.params;
    const gameToStart = gameService.startGame(id);

    if(!gameToStart){
        // Status 400 Bad Request
        return res.status(400).json({
            error: {
                code: "GAME_START_FAILED",
                message: "Nie udało się rozpocząć gry."
            }
        })
    }

    // Status 200 OK
    res.status(200).json(gameToStart);
}