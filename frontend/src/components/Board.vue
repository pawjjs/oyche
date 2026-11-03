<script setup>
import boardImage from '@/assets/board.png'

//POLA OZNACZONE
const fields = [

  // gora (lewa strona)
  { id: 1, x: 42.5, y: 3.9} ,
  { id: 2, x: 42.5, y: 10 },
  { id: 3, x: 42.5, y: 17 },
  { id: 4, x: 42.5, y: 23.5},
  { id: 5, x: 42.5, y: 30 },
  { id: 6, x: 42.5, y: 36.5 },

  //pola czerwone
  { id: 54, x: 49.8, y: 10 },
  { id: 55, x: 49.8, y: 17 },
  { id: 56, x: 49.8, y: 23.5},
  { id: 57, x: 49.8, y: 30 },
  { id: 58, x: 49.8, y: 36.5 },
  //pola czerwone - trojkat
  { id: 59, x: 49.8, y: 42.7 },
  { id: 60, x: 53.8, y: 42.7},
  { id: 61, x: 45.8, y: 42.7 },
  { id: 62, x: 49.8, y: 46.7 },


    //lewo (gora)
  { id: 7, x: 36, y: 43} ,
  { id: 8, x: 29.7, y: 43 },
  { id: 9, x: 23.2, y: 43 },
  { id: 10, x: 16.5, y: 43},
  { id: 11, x: 10, y: 43 },
  { id: 12, x: 3.4, y: 43 },

    //pola zielone
  { id: 63, x: 10, y: 50 },
  { id: 64, x: 16.5, y: 50},
  { id: 65, x: 23.2, y: 50 },
  { id: 66, x: 29.7, y: 50 },
  { id: 67, x: 36, y: 50 },
    //pola zielone - trojkat
  { id: 68, x: 42, y: 50},
  { id: 69, x: 42, y: 54 },
  { id: 70, x: 42, y: 46 },
  { id: 71, x: 46, y: 50 },


    //lewo (dół)
  { id: 13, x: 3.4, y: 49.7} ,
  { id: 14, x: 3.4, y: 56.7 },
  { id: 15, x: 23.2, y: 56.7 },
  { id: 16, x: 16.5, y: 56.7},
  { id: 17, x: 10, y: 56.7 },
  { id: 18, x: 3.4, y: 56.7 },
  { id: 19, x: 36, y: 56.7} ,
  { id: 20, x: 29.7, y: 56.7 },

    //dol (lewo)
  { id: 21, x: 42.5, y: 63.7} ,
  { id: 22, x: 42.5, y: 70.5 },
  { id: 23, x: 42.5, y: 77 },
  { id: 24, x: 42.5, y: 83.5},
  { id: 25, x: 42.5, y: 90.2 },
  { id: 26, x: 42.5, y: 96.7 },

    //pola niebieskie
  { id: 72, x: 50, y: 90.2},
  { id: 73, x: 50, y: 83.5 },
  { id: 74, x: 50, y: 77 },
  { id: 75, x: 50, y: 70.5 },
  { id: 76, x: 50, y: 63.7 },
    //pola niebieskie - trojkaty
  { id: 77, x: 50, y: 57.5 },
  { id: 78, x: 46, y: 57.5 },
  { id: 79, x: 54, y: 57.5 },
  { id: 80, x: 50, y: 53.5 },




    //dol(prawo)
  { id: 27, x: 50, y: 96.7} ,
  { id: 28, x: 57, y: 96.7 },
  { id: 29, x: 57, y: 90.2 },
  { id: 30, x: 57, y: 83.5},
  { id: 31, x: 57, y: 77 },
  { id: 32, x: 57, y: 70.5 },
  { id: 33, x: 57, y: 63.7} ,

    //prawo (dol)
  { id: 34, x: 63.2, y: 57} ,
  { id: 35, x: 69.7, y: 57 },
  { id: 36, x: 76.5, y: 57 },
  { id: 37, x: 83, y: 57},
  { id: 38, x: 89.8, y: 57 },
  { id: 39, x: 96.2, y: 57 },

    //zolte pola
  { id: 81, x: 89.8, y: 50 },
  { id: 82, x: 83, y: 50 },
  { id: 83, x: 76.5, y: 50 },
  { id: 84, x: 69.7, y: 50 },
  { id: 85, x: 63.2, y: 50 },
    //zolte pola - trojkaty
  { id: 86, x: 58, y: 50 },
  { id: 87, x: 58, y: 54 },
  { id: 88, x: 58, y: 46 },
  { id: 89, x: 54, y: 50 },

    //prawo (gora)
  { id: 40, x: 96.2, y: 50} ,
  { id: 41, x: 96.2, y: 43.2 },
  { id: 42, x: 89.8, y: 43.2 },
  { id: 43, x: 83, y: 43.2},
  { id: 44, x: 76.5, y: 43.2 },
  { id: 45, x: 69.7, y: 43.2 },
  { id: 46, x: 63.2, y: 43.2 },

    //gora(prawo)

  { id: 47, x: 56.8, y: 36.5} ,
  { id: 48, x: 56.8, y: 30 },
  { id: 49, x: 56.8, y: 23.5 },
  { id: 50, x: 56.8, y: 17},
  { id: 51, x: 56.8, y: 10 },
  { id: 52, x: 56.8, y: 3.9 },
  { id: 53, x: 49.8, y: 3.9 },


    //pionki (lobby)
  //czerwone
  { id: 90, x: 75.2, y: 11.5} ,
  { id: 91, x: 75.2, y: 26.5 },
  { id: 92, x: 88.5, y: 11.5 },
  { id: 93, x: 88.5, y: 26.5},

    //zielone
  { id: 94, x: 13.7, y: 12} ,
  { id: 95, x: 13.5, y: 25.5 },
  { id: 96, x: 25.7, y: 12.3 },
  { id: 97, x: 26, y: 25.5},

    //niebieskie
  { id: 98, x: 14.7, y: 71.8} ,
  { id: 99, x: 13.7, y: 85.2 },
  { id: 100, x: 26.5, y: 71.9 },
  { id: 101, x: 26.9, y: 85.2},

    //zolte
  { id: 102, x: 73.6, y: 71.9} ,
  { id: 103, x: 73.8, y: 85.7 },
  { id: 104, x: 86.7, y: 71.9 },
  { id: 105, x: 86.4, y: 85.7},



]

function selectField(field) {
  console.log('Kliknięto pole:', field.id)
}
</script>

<template>
  <div class="board-container">

    <img
        :src="boardImage"
        alt="Plansza"
        class="board-image"
    />

    <div class="board-overlay">

      <button
          v-for="field in fields"
          :key="field.id"
          class="board-field"
          :style="{
          left: field.x + '%',
          top: field.y + '%'
        }"
          @click="selectField(field)"
      >
        {{ field.id }}
      </button>

    </div>

  </div>
</template>

<style scoped>

.board-container {
  position: relative;

  width: min(70vh, 90%);
  aspect-ratio: 1 / 1;

  overflow: hidden;
}

/* plansza */

.board-image {
  position: absolute;

  inset: 0;

  width: 100%;
  height: 100%;

  object-fit: fill;
}

/* warstwa HTML */

.board-overlay {
  position: absolute;

  inset: 0;
}

/* pole */

.board-field {
  position: absolute;

  width: 4%;
  aspect-ratio: 1;

  transform: translate(-50%, -50%);

  border: 2px solid red;
  border-radius: 50%;

  background: rgba(255, 0, 0, 0.2);

  cursor: pointer;
}

</style>