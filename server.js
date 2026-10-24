import { openDb } from "./db.js";
import express from "express";
import { appendFile } from 'node:fs/promises'

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

app.get("/dodaj", async (req, res) => {
  const { imie } = req.query; 
  await appendFile('imie.txt', imie + '\n');
  res.send(`Witaj ${imie}!`);
}); 

app.listen(PORT, () => { 
  console.log(`Server running at http://localhost:${PORT}`);
});