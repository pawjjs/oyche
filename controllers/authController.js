import * as authService from "../services/authService.js";

export function register(req, res) {
    // Wyciągam dane z req
    const {username, email, password_hash } = req.body;
    // Przekazuje dane do serwisu
    const newUser = authService.register(username, email, password_hash);

    // Jeżeli nie uda się utworzyć użytkownika
    if (!newUser) {
        // Status 400 Bad Request
        return res.status(400).json({
            error: {
                code: "USER_CREATION_FAILED",
                message: "Nie udało się utworzyć użytkownika."
            }
        });
    }
    
    // W inny przypadku zwracam utworzonego użytkownika
    // Status 201 Created
    res.status(201).json(newUser);
}

export function login(req, res) {
    const {username, password} = req.body;
    const userFound = authService.login(username, password);

    if (!userFound) {
        // Status 401 Unauthorized
        return res.status(401).json({
            error: {
                code: "LOGIN_FAILED",
                message: "Nie udało się zalogować użytkownika."
            }
        });
    }

    // Status 200 OK
    res.status(200).json(userFound);
}

export function logout(req, res) {
    const result = authService.logout();

    if(!result) {
        // Status 400 Bad Request
        return res.status(400).json({
            error: {
                code: "LOGOUT_FAILED",
                message: "Nie udało się wylogować użytkownika."
            }
        });
    }

    // Status 200 OK
    res.status(200).json(result);
}