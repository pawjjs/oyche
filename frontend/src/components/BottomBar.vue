<template>
  <div class="bottom-bar">

    <!--gracz-->
    <div class="player">
      <div class="avatar">
        👩🏻
      </div>

      <span>Ania</span>
    </div>

    <!-- kostka z timerem -->
    <div class="dice-section">
      <div class="dice">
        🎲
      </div>

      <div class="timer">
        00:30
      </div>
    </div>

    <!-- uzytkownicy -->
    <div class="players">

      <div class="player-name active">
        Ania
      </div>

      <div class="player-name inactive">
        Paweł
      </div>

      <div class="player-name inactive">
        Kasia
      </div>

      <div class="player-name inactive">
        Tomek
      </div>

    </div>

  </div>
</template>

<style scoped>
.bottom-bar {
  height: 100%;

  display: grid;
  grid-template-columns: 120px 150px 1fr;
}

/* awatar */

.player {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border-right: 1px solid #222;

  gap: 4px;
}

.avatar {
  font-size: 35px;
}

/* kostka */

.dice-section {
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  border-right: 1px solid #222;
}

.dice {
  font-size: 42px;
  line-height: 1;
}

.timer {
  margin-top: 5px;

  font-size: 18px;
}

/* gracze */

.players {
  display: flex;
  flex-direction: column;

  justify-content: center;

  padding: 10px 20px;

  gap: 5px;
}

.player-name {
  font-size: 16px;
}

/* tura */

.active {
  color: green;
  font-weight: bold;
}

.inactive {
  color: red;
}
</style>