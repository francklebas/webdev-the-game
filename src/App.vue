<script setup lang="ts">
import { ref } from "vue";
import GameCanvas from "./components/GameCanvas.vue";

const score = ref(0);

function handleTick(deltaScore: number): void {
  score.value += deltaScore;
}
</script>

<template>
  <main class="layout">
    <header class="hud">
      <h1>Webdev The Game</h1>
      <p>Boilerplate Vue + PixiJS</p>
      <div class="score">Score: {{ score }}</div>
    </header>

    <section class="stage-card">
      <GameCanvas @tick-score="handleTick" />
    </section>
  </main>
</template>
