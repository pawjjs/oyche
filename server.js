import express from "express";
import db from "./db.js"; 
import http from 'http';
import path from 'path';
import { randomBytes, randomUUID } from "node:crypto";


class User{
  constructor(id, username, email, password_hash){
    this.id = id;
    this.username = username;
    this.email = email;
    this.password_hash = password_hash;
  }

  wypisanie() {
    console.log("ID: " + this.id);
    console.log("Username: " + this.username);
    console.log("Email: " + this.email);
  }
}

class Game{
  // constructor(id, user){
  //   this.id = id;
  //   this.round = 0;
  //   this.user = user;
  // }

  constructor(id, owner){
    this.id = id;
    this.round = 0;
    this.owner = owner
    this.players = [owner]
  }

  wypisanie() {
    console.log("ID: " + this.id);
    console.log("Runda: " + this.round);
    // console.log("Właściciel: ");
    // this.user.wypisanie();
    console.log(`Wlasciciel: ${this.owner.username}`)
    console.log(`Gracze: ${this.players.map(p => p.username)}`)
  }
}

let users = [];
let games = [];
let loggedIn = false;
let currentlyLogged;

function logState() {
  console.log("==============================");
  console.log("Użytkownicy:");
  users.forEach(u => u.wypisanie());

  console.log("Gry:");
  games.forEach(g => g.wypisanie());

  console.log("Zalogowany:");
  if (currentlyLogged) {
    currentlyLogged.wypisanie()
  }
  else {
    console.log("-----");
  }

  console.log("Czy zalogowany?: " + loggedIn);
  console.log("==============================");
}

const app = express();
const server = http.createServer(app)
const PORT = 3000;

app.use(express.json())

app.get("/", (req, res) => {
  res.send("Lets play some chinese guy!");
});

app.get("/register", async (req, res) => {
  const {id, username, email, password_hash } = req.query;
  let newUser = new User(id, username, email, password_hash);
  users.push(newUser); 
  res.send(`Witaj ${newUser.username}! Znam twoje hasło ${newUser.password_hash}`);

  logState();
});

app.get("/login", async (req, res) =>{
  const {username, password} = req.query;

  if(loggedIn == true){
    res.send(`Już jesteś zalogowany ${username}`)
  }else{
    let userFound = users.find(x => x.username === username);

    // users.forEach((x) => {
    //   if(x.username == username){
    //     userFound = x;
    //   }
    // });

    if(!userFound){
      res.send(`Nie znaleziono użytkownika o nazwie ${username}`);
    }else{
      if(userFound.password_hash == password){
        loggedIn = true;
        currentlyLogged = userFound;
        res.send(`Witaj ${username}! Zacznijmy rozgrywkę!`);
      }else{
        res.send(`Niepoprawne hasło!`);
      }
    }
  }

  logState();
});

app.get("/logout", async (req, res) =>{
  currentlyLogged = null;
  loggedIn = false;
  res.send(`Wylogowano!`);

  logState();
});

function generatorKodow(){
  return randomBytes(3).toString('hex');
}

// app.get("/newGame", async (req, res) => {
//   const wygenerowanyKod = generatorKodow()
//
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
//
//     if (isExisting == false){
//       games.push(new Game(wygenerowanyKod, currentlyLogged));
//       res.send(`Stworzono grę o ID ${wygenerowanyKod} i należy ona do ${currentlyLogged.username}!`);
//     }else{
//       res.send(`Gra o ID ${wygenerowanyKod} już istnieje!`);
//     }
//   }
//
//   logState();
// });


app.get("/newGame", async (req,res) => {
  if (!loggedIn || !currentlyLogged) {
    return res.send("Zaloguj się!!!");
  }

  const wygenerowanyKod = generatorKodow();



  try {
    await db.run(
        `INSERT INTO GAMES (id, host_id, status, created_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP)`,
        [wygenerowanyKod, currentlyLogged.id, 'waiting']
    );

    await db.run(
        `INSERT INTO GAME_PLAYERS (game_id, user_id, color, position) VALUES (?, ?, ?, ?)`,
        [wygenerowanyKod, currentlyLogged.id, 'Czerwony', -1]
    );

    await db.run(
        `INSERT INTO GAME_STATES (game_id, board_state, current_turn_user_id) VALUES (?, ?, ?)`,
        [wygenerowanyKod, JSON.stringify({ board: [] }), currentlyLogged.id]
    );

    res.send(`Sukces! Stworzono grę o ID: ${wygenerowanyKod} dla hosta: ${currentlyLogged.id}`);
  } catch (err) {
    res.status(500).send("Błąd podczas tworzenia gry w bazie: " + err.message);
  }
});




app.get("/game/:id/join", async (req, res) => {
  const { id } = req.params;

  if (!loggedIn || !currentlyLogged) {
    return res.status(401).send("Nie jesteś zalogowany!");
  }

  try {
    const game = await db.get(`SELECT * FROM GAMES WHERE id = ?`, [id]);
    console.log(game);

    if (!game) {
      return res.status(404).send(`Nie ma gry o ID: ${id}!`);
    }

    if (game.status !== 'waiting') {
      return res.status(400).send("Gra się już rozpoczęła. Nie można do niej dołączyć!");
    }
    console.log("Status gry w bazie:", game.status);

    await db.run(
        `INSERT INTO GAME_PLAYERS (game_id, user_id, color, position) VALUES (?, ?, ?, ?)`,
        [id, currentlyLogged.id, 'Zielony', -1]
    );

    res.send(`Dołączono do gry o ID: ${id}!`);
  } catch (err) {
    res.status(400).send("Błąd podczas dołączania do gry (może już w niej jesteś?): " + err.message);
  }

  logState();
});
app.get("/game/:id/start", async (req, res) => {
  if(loggedIn == false){
    res.send(`Na początek się zaloguj!`);
  }else{
    const {id} = req.params;
    let isExisting = false;
    let gameToStart = {};
    games.forEach(singleGame => {
      if(singleGame.id == id){
        isExisting = true;
        gameToStart = singleGame;
      }
    });

    if (isExisting == false){
      res.send(`Nie ma gry o ID ${id}!`);
    }else{
      if(gameToStart.owner.username == currentlyLogged.username){
        res.send(`Rozpoczęto grę o ID ${id}`);
        gameToStart.round = 1;
      }else{
        res.send(`Ta gra nie należy do Ciebie! Nie możesz jej rozpocząć!`);
      }
    }
  }

  logState();
});

server.listen(PORT, () => { 
  console.log(`Server running at http://localhost:${PORT}`);
});