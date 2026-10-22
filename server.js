import express from "express"; 
import { appendFile } from 'node:fs/promises'

class User{
  constructor(id, username, email, password_hash){
    this.id = id;
    this.username = username;
    this.email = email;
    this.password_hash = password_hash;
  }
}

class Game{
  constructor(id){
    this.id = id;
    this.round = 0;
  }
}

const games = [];

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

app.get("/dodaj", async (req, res) => {
  const {id, username, email, password_hash } = req.query;
  let newUser = new User(id, username, email, password_hash); 
  await appendFile('users.txt', 'ID: ' + newUser.id + '\nName: ' +  newUser.username + '\nEmail: ' + newUser.email +  '\nPassword: '+ newUser.password_hash + '\n');
  res.send(`Witaj ${newUser.username}! Znam twoje hasło ${newUser.password_hash}`);
});

app.get("/game", async (req, res) => {
  const {id} = req.query;
  let isExisting = false;
  games.forEach(singleGame => {
    if(singleGame.id == id){
      res.send(`Gra o ID ${id} już istnieje!`);
      isExisting = true;
    }
  });

  if (isExisting == false){
    games.push(new Game(id));
    res.send(`Stworzono grę o ID ${id}!`);
  }
  console.log(games);
});

app.get("/game/:id/start", async (req, res) => {
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
    res.send(`Rozpoczęto grę o ID ${id}`);
    gameToStart.round = 1;
  }

  console.log(games);
});


app.listen(PORT, () => { 
  console.log(`Server running at http://localhost:${PORT}`);
});