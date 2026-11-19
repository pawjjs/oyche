<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Zmienne reaktywne przechowujace dane wpisane przez uzytkownika
const username = ref('')
const email = ref('')
const password = ref('')

const error = ref('')

async function register() {
    // Wyslanie danych do Expressa
    const response = await fetch('/api/auth/register', {
        method: 'POST',
        // Okreslenie typu wysylanych danych
        headers: {
            'Content-Type': 'application/json'
        },
        // Przekazanie danych wpisanych przez uzytkownika w formacie JSON
        body: JSON.stringify({
            username: username.value,
            email: email.value,
            password: password.value
        })
    })

    // Pobranie danych z odpowiedzi Expressa
    const data = await response.json()

    // Jesli rejestracja sie powiodla, przekierowanie na strone logowania
    if (response.ok) {
        router.push('/login')
    } else {
        // Jesli wystapil blad, zapisanie komunikatu do zmiennej error
        error.value = data.message
    }
}
</script>

<template>
    <h1>Rejestracja</h1>

    <!-- Uruchomienie funkcji register po wyslaniu formularza i zapobieganie przeladowaniu strony -->
    <form @submit.prevent="register">
        <!-- Powiazanie pol formularza ze zmiennymi reaktywnymi za pomoca v-model -->
        <input v-model="username" placeholder="Nazwa użytkownika">
        <input v-model="email" type="email" placeholder="Email">
        <input v-model="password" type="password" placeholder="Hasło">

        <button type="submit">Zarejestruj się</button>
    </form>

    <!-- Wyswietlenie komunikatu, jesli zmienna error NIE jest pusta -->
    <p v-if="error">{{ error }}</p>

    <!-- Link przekierowujacy do formularza logowania -->
    <router-link to="/login">Masz już konto? Zaloguj się</router-link>
</template>