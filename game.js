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
        let player = this.players[this.currentTurnIndex];
        let roll = Math.floor(Math.random() * 6) + 1;
        let message = '';

        if (player.position === -1) {
            if (roll === 6) {
                player.position = 0;
                message = `${player.colors} wyrzucil 6,opuscil baze`;
                this.checkCapture(player);
            } else {
                message = `${player.color} wyrzucil ${roll} (musisz wyrzucic 6)`;
            }
        } else {
            let oldPos = player.position;
            let newPos = (player.position + roll) % this.boardSize;
            player.position = newPos;
            message = `${player.colors} przesunal sie z ${oldPos} na ${newPos} (rzut: ${roll}).`;
            this.checkCapture(player);
        }

        this.currentTurnIndex++;

        if (this.currentTurnIndex >= this.players.length) {
            this.currentTurnIndex = 0;

        return { roll, message, players: this.players, turn: this.currentTurnIndex };
    }
}

checkCapture(movingPlayer) {
        let victim = null;
        for (let i = 0; i < this.players.length; i++) {
            let p = this.players[i];

            if (p !== movingPlayer && p.position === movingPlayer.position) {
                victim = p;
                break;
            }
        }

        if (victim) {
            victim.position = -1;
            console.log(`Zbito pionek gracza ${victim.name}`);
        }
    }
}
