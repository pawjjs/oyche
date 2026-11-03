import Player from "./player.js";

export default class Game {
    constructor(playerCount = 2) {
        this.boardSize = 40;
        this.players = [];

        const colors = ['Czerwony', 'Niebieski', 'Zielony', 'Zolty'];
        const symbols = ['[1]', '[2]', '[3]', '[4]'];

        for (let i = 0; i < playerCount; i++) {
            this.players.push(new Player(colors[i], symbols[i]));
        }

        this.currentTurnIndex = 0;
    }

    rollTheDice() {
        const player = this.players[this.currentTurnIndex];
        const roll = Math.floor(Math.random() * 6) + 1;
        let message = '';

        if (player.position === -1) {
            if (roll === 6) {
                player.position = 0;
                message = `${player.name} wyrzucił 6, opuścił bazę`;
                this.checkCapture(player);
            } else {
                message = `${player.name} wyrzucił ${roll} (musisz wyrzucić 6)`;
            }
        } else {
            const oldPos = player.position;
            const newPos = (player.position + roll) % this.boardSize;

            player.position = newPos;

            message = `${player.name} przesunął się z ${oldPos} na ${newPos} (rzut: ${roll}).`;

            this.checkCapture(player);
        }

        this.currentTurnIndex =
            (this.currentTurnIndex + 1) % this.players.length;

        return {
            roll,
            message,
            players: this.players,
            turn: this.currentTurnIndex
        };
    }

    checkCapture(movingPlayer) {
        const victim = this.players.find(
            p => p !== movingPlayer &&
                 p.position === movingPlayer.position
        );

        if (victim) {
            victim.position = -1;
            console.log(`Zbito pionek gracza ${victim.name}`);
        }
    }
}