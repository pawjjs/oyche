<template>
  <div class="chat">

    <h2>CHAT</h2>

    <div class="messages">
      <div class="message">
        <strong>Ania:</strong>
        Cześć!
      </div>

      <div class="message">
        <strong>Paweł:</strong>
        Hej 👋
      </div>

      <div class="message">
        <strong>Kasia:</strong>
        Gramy?
      </div>
    </div>

    <div class="chat-input">
      <input
          type="text"
          placeholder="Napisz wiadomość..."
      />

      <button>➤</button>
    </div>

  </div>
</template>

<style scoped>
.chat {
  height: 100%;

  display: flex;
  flex-direction: column;

  box-sizing: border-box;
}

h2 {
  margin: 0;
  padding: 15px;

  border-bottom: 2px solid #222;

  text-align: center;
}

.messages {
  flex: 1;

  padding: 15px;

  display: flex;
  flex-direction: column;
  gap: 10px;

  overflow-y: auto;
}

.message {
  padding: 8px;

  border-radius: 8px;
  background: #f2f2f2;
}

.chat-input {
  display: flex;

  padding: 10px;
  gap: 5px;

  border-top: 2px solid #222;
}

.chat-input input {
  min-width: 0;
  flex: 1;

  padding: 8px;
}

.chat-input button {
  width: 35px;
}
</style>