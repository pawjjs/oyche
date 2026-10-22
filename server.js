import express from "express";
import { open } from "sqlite";
import sqlite3 from "sqlite3";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sqliteDriver = sqlite3.verbose();

const dbPromise = open({
  filename: join(__dirname, 'Chinczyk.sqlite'),
  driver: sqliteDriver.Database
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

app.get("/users", async (req, res) => {
  try {
    const db = await dbPromise;
    const users = await db.all("SELECT id, username, email FROM users");
    res.json(users);
  } catch (error) {
    console.error("Szczegóły błędu:", error);
    res.status(500).json({
      error: "Błąd podczas pobierania użytkowników",
      message: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});