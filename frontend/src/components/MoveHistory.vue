<template>
  <div class="history">

    <h2>HISTORIA RUCHÓW</h2>

    <div class="moves">
      <p>Ania wyrzuciła 6</p>
      <p>Paweł przesunął pionek</p>
      <p>Kasia wyrzuciła 3</p>
      <p>Ania wyrzuciła 5</p>
    </div>

  </div>
</template>

<style scoped>
.history {
  flex: 1;

  display: flex;
  flex-direction: column;
}

h2 {
  margin: 0;
  padding: 15px;

  font-size: 16px;

  border-bottom: 1px solid #222;
}

.moves {
  padding: 10px;

  overflow-y: auto;
}

.moves p {
  margin: 0;
  padding: 8px 0;

  border-bottom: 1px solid #ddd;

  font-size: 13px;
}
</style>