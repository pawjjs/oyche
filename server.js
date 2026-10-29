import express from "express";
import db from "./db.js";
import { appendFile } from 'node:fs/promises';

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
  constructor(id, user){
    this.id = id;
    this.round = 0;
    this.user = user;
  }

  wypisanie() {
    console.log("ID: " + this.id);
    console.log("Runda: " + this.round);
    console.log("Właściciel: ");
    this.user.wypisanie();
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
const PORT = 3000;

app.use(express.json())

app.get("/", (req, res) => {
  res.send("Lets play some chinese guy!");
});

app.get("/register", async (req, res) => {
  const {id, username, email, password_hash } = req.query;
  let newUser = new User(id, username, email, password_hash);
  users.push(newUser); 
  await appendFile('users.txt', 'ID: ' + newUser.id + '\nName: ' +  newUser.username + '\nEmail: ' + newUser.email +  '\nPassword: '+ newUser.password_hash + '\n');
  res.send(`Witaj ${newUser.username}! Znam twoje hasło ${newUser.password_hash}`);

  logState();
});

app.get("/login", async (req, res) =>{
  const {username, password} = req.query;

  if(loggedIn == true){
    res.send(`Już jesteś zalogowany ${username}`)
  }else{
    let userFound = {};

    users.forEach((x) => {
      if(x.username == username){
        userFound = x;
      }
    });

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

app.get("/game", async (req, res) => {
  if(loggedIn == false){
    res.send(`Zaloguj się!!!`);
  }else{
    const {id} = req.query;
    let isExisting = false;
    games.forEach(singleGame => {
      if(singleGame.id == id){
        isExisting = true;
      }
    });

    if (isExisting == false){
      games.push(new Game(id, currentlyLogged));
      res.send(`Stworzono grę o ID ${id} i należy ona do ${currentlyLogged.username}!`);
    }else{
      res.send(`Gra o ID ${id} już istnieje!`);
    }
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
      if(gameToStart.user.username == currentlyLogged.username){
        res.send(`Rozpoczęto grę o ID ${id}`);
        gameToStart.round = 1;
      }else{
        res.send(`Ta gra nie należy do Ciebie! Nie możesz jej rozpocząć!`);
      }
    }
  }

  logState();
});

app.post("/dodaj", async (req, res) => {
  const { imie } = req.body;

  if (!imie || imie.trim() === ""){
    return res.status(400).send("Błąd: Musisz podać imię w formacie JSON");
  }

  try {
    await appendFile('imie.txt', imie.trim() + "\n");
    res.status(201).send(`Dodane do pliku: ${imie}`);  
  } catch (error) {
    console.error("ERROR", error);
    res.status(500).send("Blad servera");
  }
});

app.listen(PORT, () => { 
  console.log(`Server running at http://localhost:${PORT}`);
});
