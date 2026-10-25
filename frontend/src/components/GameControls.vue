<script setup>
import { ref } from 'vue'

const isOpen = ref(false)

function toggleMenu() {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="controls">

    <!-- przycisk otwierajacy -->
    <button class="menu-button" @click="toggleMenu">
      ☰
    </button>

    <!-- rozwijane menu -->
    <div v-if="isOpen" class="menu">

      <button class="menu-option">
        RESET GRY
      </button>

      <button class="menu-option">
        PODDAJ GRĘ
      </button>

    </div>

  </div>
</template>

<style scoped>

.controls {
  position: relative;
  padding: 10px;

  border-bottom: 2px solid #222;
}

/* ☰ */

.menu-button {
  width: 45px;
  height: 45px;

  font-size: 24px;

  background: white;

  border: 1px solid #222;
  border-radius: 6px;

  cursor: pointer;
}

.menu-button:hover {
  background: #f2f2f2;
}

/* menu */

.menu {
  position: absolute;

  top: 65px;
  left: 10px;

  width: 180px;

  padding: 10px;

  background: white;

  border: 1px solid #222;
  border-radius: 8px;

  display: flex;
  flex-direction: column;

  gap: 10px;

  z-index: 10;
}

/* opcje */

.menu-option {
  padding: 12px;

  background: white;

  border: 1px solid #222;
  border-radius: 6px;

  cursor: pointer;
}

.menu-option:hover {
  background: #f2f2f2;
}

</style>