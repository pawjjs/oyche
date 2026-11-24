import { randomBytes } from "node:crypto";
import {currentlyLogged} from "./authService.js";
import Game from "../models/game.js";
import GameLogic from "../models/gameLogic.js";

function generatorKodow(){
  return randomBytes(3).toString('hex');
}

let games = [];

// Było
// app.get("/newGame", async (req, res) => {
//   const wygenerowanyKod = generatorKodow()

//   if(loggedIn == false){
//     res.send(`Zaloguj się!!!`);
//   }else{
//     // const {id} = req.query;
//     let isExisting = false;
//     games.forEach(singleGame => {
//       if(singleGame.id == wygenerowanyKod){
//         isExisting = true;
//       }
//     });

//     if (isExisting == false){
//       games.push(new Game(wygenerowanyKod, currentlyLogged));
//       res.send(`Stworzono grę o ID ${wygenerowanyKod} i należy ona do ${currentlyLogged.username}!`);
//     }else{
//       res.send(`Gra o ID ${wygenerowanyKod} już istnieje!`);
//     }
//   }
  
//   logState();
// });

// Jest
export function newGame() {
    const wygenerowanyKod = generatorKodow();

    if (currentlyLogged === null) {
        return null;
    }

    const isExisting = games.find(singleGame => singleGame.id == wygenerowanyKod);

    if (!isExisting) {
        const newGame = new Game(wygenerowanyKod, currentlyLogged);
        games.push(newGame);
        return newGame;
    }else{
        return null;
    }
}

// Było
// app.get("/game/:id/join", async (req, res) => {
//   const {id} = req.params;
  
//   const game = games.find(g => g.id === id) 

//   if(!loggedIn){
//     return res.status(401).send("Nie jestes zalogowany!");
//   }

//   if(!game){
//     return res.status(404).send("Nie ma takiej gry!");
//   }

//   if(game.players.find(p => p === currentlyLogged)){
//     return res.status(400).send("Juz dolaczyles!");
//   }

//   //tymczasowe
//   if(game.round > 0){
//     return res.status(400).send("Gra sie juz rozpoczela. Nie mozna do niej dolaczyc");
//   }

//   if(game.players.length >= 4){
//     return res.status(400).send("Gra jest pelna!");
// }

//   game.players.push(currentlyLogged);
//   res.send(`Dołączono do gry ${game.id}!`);

//   logState()
// })

// Jest
export function joinGame(id) {
    const game = games.find(g => g.id === id);

    if (currentlyLogged === null) {
        return null;
    }

    if (!game) {
        return null;
    }

    if(game.players.find(p => p === currentlyLogged)) {
        return null;
    }

    if(game.round > 0) {
        return null;
    }

    if(game.players.length >= 4) {
        return null;
    }
    
    game.players.push(currentlyLogged);
    return game;
}

// Było
// app.get("/game/:id/start", async (req, res) => {
//   if(loggedIn == false){
//     res.send(`Na początek się zaloguj!`);
//   }else{
//     const {id} = req.params;
//     let isExisting = false;
//     let gameToStart = {};
//     games.forEach(singleGame => {
//       if(singleGame.id == id){
//         isExisting = true;
//         gameToStart = singleGame;
//       }
//     });

//     if (isExisting == false){
//       res.send(`Nie ma gry o ID ${id}!`);
//     }else{
//       if(gameToStart.owner.username == currentlyLogged.username){
//           if(gameToStart.players.length < 2){
//               res.send(`Potrzeba minimum 2 graczy!`);
//           }else{
//               gameToStart.round = 1;
//               gameToStart.logic = new GameLogic(gameToStart.players.length);
//               res.send(`Rozpoczęto grę o ID ${id}`);
//           }
//       }else{
//         res.send(`Ta gra nie należy do Ciebie! Nie możesz jej rozpocząć!`);
//       }
//     }
//   }

//   logState();
// });

//Jest
export function startGame(id) {
    if (currentlyLogged === null) {
        return null;
    }

    const gameToStart = games.find(g => g.id === id);

    if (!gameToStart) {
        return null;
    }else{
        if(gameToStart.owner.username === currentlyLogged.username){
            if(gameToStart.players.length < 2){
                return null;
            }else{
                gameToStart.round = 1;
                gameToStart.logic = new GameLogic(gameToStart.players.length);
                return gameToStart;
            }
        }else{
            return null;
        }
    }
}