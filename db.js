import { DatabaseSync } from 'node:sqlite';

export function openDatabase(path = process.env.DB_PATH ?? 'Chinczyk.sqlite') {
    const db = new DatabaseSync(path);
    db.exec('PRAGMA journal_mode = WAL');
    db.exec('PRAGMA foreign_keys = ON');
    return db;
}