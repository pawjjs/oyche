<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const username = ref('')
const password = ref('')

const error = ref('')

async function login() {
    // Wyslanie danych do Expressa
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        // Okreslenie typu wysylanych danych
        headers: {
            'Content-Type': 'application/json'
        },
        // Przekazanie nazwy uzytkownika i hasla w formacie JSON
        body: JSON.stringify({
            username: username.value,
            password: password.value
        })
    })

    // Pobranie odpowiedzi z Expressa w formacie JSON
    const data = await response.json()

    // Jesli logowanie sie powiodlo, przekierowanie na strone glowna
    if (response.ok) {
        router.push('/')
    } else {
        // Jesli wystapil blad, zapisanie komunikatu do zmiennej error
        error.value = data.message
    }
}
</script>

<template>
    <h1>Logowanie</h1>

    <!-- Uruchomienie funkcji login() po wyslaniu formularza -->
    <form @submit.prevent="login">
        <input v-model="username" placeholder="Nazwa użytkownika">
        <input v-model="password" type="password" placeholder="Hasło">

        <button type="submit">Zaloguj się</button>
    </form>

    <!-- Wyswietlenie komunikatu, jesli zmienna error nie jest pusta -->
    <p v-if="error">{{ error }}</p>

    <!-- Link przekierowujacy do formularza rejestracji -->
    <router-link to="/register">Nie masz konta? Zarejestruj się</router-link>
</template>