<script setup>
import Chat from '../components/Chat.vue'
import Board from '../components/Board.vue'
import GameControls from '../components/GameControls.vue'
import MoveHistory from '../components/MoveHistory.vue'
import BottomBar from '../components/BottomBar.vue'
</script>


<template>
  <div class="game-layout">

    <aside class="chat-section">
      <Chat />
    </aside>

    <main class="board-section">
      <Board />
    </main>

    <aside class="side-section">
      <GameControls />
      <MoveHistory />
    </aside>

    <footer class="bottom-section">
      <BottomBar />
    </footer>

  </div>

</template>

<style scoped>
.game-layout {
  width: 100vw;
  height: 100vh;

  display: grid;

  grid-template-columns: 220px 1fr 220px;
  grid-template-rows: 1fr 100px;

  gap: 10px;
  padding: 10px;

  box-sizing: border-box;
}

.chat-section,
.board-section,
.side-section,
.bottom-section {
  border: 2px solid #222;
  border-radius: 10px;
  overflow: hidden;
}

.chat-section {
  grid-column: 1;
  grid-row: 1;
}

.board-section {
  grid-column: 2;
  grid-row: 1;

  display: flex;
  align-items: center;
  justify-content: center;
}

.side-section {
  grid-column: 3;
  grid-row: 1;

  display: flex;
  flex-direction: column;
}

.bottom-section {
  grid-column: 1 / 4;
  grid-row: 2;
}
</style>