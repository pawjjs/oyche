import express from "express";
import db from "./db.js"; 
import http from 'http';
import path from 'path';
import { WebSocketServer } from "ws";
import auth from "./routes/auth.js";
import game from "./routes/game.js";

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
// Router dla game
app.use(game);

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