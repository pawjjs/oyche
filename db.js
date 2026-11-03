import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';
import sqlite3 from 'sqlite3';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, 'Chinczyk.sqlite');

const db = await open({
    filename: dbPath,
    driver: sqlite3.Database
});

console.log('Połączono z bazą chibczyk.sqlite przy użyciu paczki sqlite!');

export default db;