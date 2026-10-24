import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, 'Chinczyk.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Błąd połączenia z bazą danych', err.message);
    } else {
        console.log('Połączono z bazą');
    }
});

export default db;