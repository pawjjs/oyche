import express from "express"; 
import { appendFile } from 'node:fs/promises'

const app = express();
const PORT = 3000;

app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello from Express!");
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