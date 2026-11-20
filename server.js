import express from "express";
import db from "./db.js"; 
import http from 'http';
import path from 'path';
import { randomBytes } from "node:crypto";
import { WebSocketServer } from "ws";
import GameLogic from "./gameLogic.js";
import auth from "./routes/auth.js";

// let games = [];
// let loggedIn = false;
// let currentlyLogged;

// function logState() {
//   console.log("==============================");
//   console.log("Użytkownicy:");
//   users.forEach(u => u.wypisanie());

//   console.log("Gry:");
//   games.forEach(g => g.wypisanie());

//   console.log("Zalogowany:");
//   if (currentlyLogged) {
//     currentlyLogged.wypisanie()
//   }
//   else {
//     console.log("-----");
//   }

//   console.log("Czy zalogowany?: " + loggedIn);
//   console.log("==============================");
// }

// function generatorKodow(){
//   return randomBytes(3).toString('hex');
// }

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

const app = express();
const server = http.createServer(app)
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Lets play some chinese guy!");
});

// Obsługa JSONa
app.use(express.json())
// Router dla auth
app.use(auth);

const wss = new WebSocketServer({ server });

wss.on('connection', (client) => {
  client.send('Siema');
  client.on('message', (msg) => {
    console.log(`${msg}`);
  });
});

server.listen(PORT, () => { 
  console.log(`Server running at http://localhost:${PORT}`);
});