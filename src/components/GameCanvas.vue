<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { createGameApp } from "../game/createGameApp";

const emit = defineEmits<{
  (e: "tick-score", value: number): void;
}>();
const host = ref<HTMLElement | null>(null);
let game: Awaited<ReturnType<typeof createGameApp>> | null = null;

onMounted(async () => {
  if (!host.value) {
    return;
  }

  game = await createGameApp(host.value, {
    onScoreTick(value: number) {
      emit("tick-score", value);
    },
  });
});

onUnmounted(async () => {
  if (game) {
    await game.destroy();
    game = null;
  }
});
</script>

<template>
  <div ref="host" class="game-host" />
</template>

<style scoped>
.game-host {
  width: 100%;
  aspect-ratio: 16 / 9;
  min-height: 280px;
  border-radius: 12px;
  overflow: hidden;
  background: linear-gradient(180deg, #12304d 0%, #1f5377 50%, #2f7aa2 100%);
}
</style>
