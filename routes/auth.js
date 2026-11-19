import express from 'express';
import bcrypt from 'bcrypt';
import db from '../db.js';

const router = express.Router();

// Funkcja pobierajaca jeden rekord z bazy danych
function get(sql, params = []) {
    //utworzenie promise
    return new Promise((resolve, reject) => {
        //pobranie jednego rekordu z bazy (get)
        db.get(sql, params, (err, row) => {
            if (err){
                //jesli blad to promise odrzucony z wiadomoscia error
                reject(err);  
            }else{
                //jesli dobrze to zwracany jest rekord z bazy "row"
                resolve(row);
            } 
        });
    });
}

// Funkcja wykonujaca zapytanie zapisujace dane w bazie
function run(sql, params = []) {
    return new Promise((resolve, reject) => {
        //run sluzy do zapytan zmieniajacych dane w bazie
        db.run(sql, params, (err) => {
            if (err){
                reject(err);
            }else{
                resolve(this);
            } 
        });
    });
}

router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        //sprawdzenie czy pola nie sa puste
        if (!username || !email || !password) {
            return res.status(400).json({
                message: 'Wszystkie pola sa wymagane'
            });
        }

        //sprawdzenie czy login lub email jest juz zajety
        const user = await get(
            'SELECT * FROM USERS WHERE username = ? OR email = ?',
            [username, email]
        );

        //jesli promise zwrocil dane
        if (user) {
            return res.status(409).json({
                message: 'Uzytkownik juz istnieje'
            });
        }

        //zahashowanie hasla
        const passwordHash = await bcrypt.hash(password, 10);

        //zapisanie uzytkownika do bazy
        await run(
            'INSERT INTO USERS (username, email, password_hash) VALUES (?, ?, ?)',
            [username, email, passwordHash]
        );

        //przekazanie informacji jesli wszystko dobrze
        res.status(201).json({
            message: 'Zarejestrowano pomyslnie'
        });

    //jesli w trakcie wystapil jakis blad
    } catch (err) {
        console.error(err);
        //wyslanie wiadomosci o bledzie
        res.status(500).json({
            message: 'Blad podczas rejestracji'
        });
    }
});


router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        //sprawdzenie czy pola nie sa puste
        if (!username || !password) {
            return res.status(400).json({
                message: 'Login i haslo sa wymagane'
            });
        }

        //znalezienie uzytkownika po loginie
        const user = await get(
            'SELECT * FROM USERS WHERE username = ?',
            [username]
        );

        //jesli nie znaleziono usera
        if (!user) {
            return res.status(401).json({
                message: 'Nieprawidlowy login lub haslo'
            });
        }

        //sprawdzenie czy uzytkownik posiada hash hasla
        if (!password || !user.password_hash) {
            return res.status(401).json({
                message: 'Nieprawidlowy login lub haslo'
            });
        }

        //porownanie podanego hasla z hashem w bazie
        const poprawneHaslo = await bcrypt.compare(
            password,
            user.password_hash
        );

        //jesli haslo sie nie zgadza
        if (!poprawneHaslo) {
            return res.status(401).json({
                message: 'Nieprawidlowy login lub haslo'
            });
        }

        //jesli wszystko sie zgadza
        res.status(200).json({
            message: 'Zalogowano pomyslnie',
            username: user.username,
            id: user.id
        });

    //jesli byl po dordze jakis blad
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Blad podczas logowania'
        });
    }
});

//export routera (importowany i uzywany w server.js)
export default router;
