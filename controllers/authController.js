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