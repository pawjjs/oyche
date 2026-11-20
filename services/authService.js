import User from "../models/user.js";

let users = [];
// licznik id dla użytkowników
let idForUser = 1;

// Było
// app.get("/register", async (req, res) => {
//   const {id, username, email, password_hash } = req.query;
//   let newUser = new User(id, username, email, password_hash);
//   users.push(newUser); 
//   res.send(`Witaj ${newUser.username}! Znam twoje hasło ${newUser.password_hash}`);

//   logState();
// });

// Jest
export function register(username, email, password_hash) {
    // Sprawdzam czy użytkownik o takim id (które dopiero nadam) lub email już istnieje
    const isExisting = users.find(u => u.id === idForUser || u.email === email);
    if (isExisting) {
        return null;
    }

    // Przyjmuje dane z kontrolera i tworzę nowego użytkownika
    const newUser = new User(idForUser, username, email, password_hash);

    // console.log(newUser);

    // Zwiększam licznik id dla następnego użytkownika
    idForUser++;
    // Dodaję go do tablicy
    users.push(newUser);

    return newUser;
}

// Do zrobienia
// app.get("/login", async (req, res) =>{
//   const {username, password} = req.query;

//   if(loggedIn == true){
//     res.send(`Już jesteś zalogowany ${username}`)
//   }else{
//     let userFound = users.find(x => x.username === username);

//     // users.forEach((x) => {
//     //   if(x.username == username){
//     //     userFound = x;
//     //   }
//     // });

//     if(!userFound){
//       res.send(`Nie znaleziono użytkownika o nazwie ${username}`);
//     }else{
//       if(userFound.password_hash == password){
//         loggedIn = true;
//         currentlyLogged = userFound;
//         res.send(`Witaj ${username}! Zacznijmy rozgrywkę!`);
//       }else{
//         res.send(`Niepoprawne hasło!`);
//       }
//     }
//   }

//   logState();
// });

// app.get("/logout", async (req, res) =>{
//   currentlyLogged = null;
//   loggedIn = false;
//   res.send(`Wylogowano!`);

//   logState();
// });