# Boilerplate Vue + PixiJS

Starter template to build a web game with Vue 3 (UI/HUD) and PixiJS (GPU 2D rendering).

## Run the project

```bash
bun install
bun run dev
```

## Tooling dev/test

```bash
bun run lint
bun run format:check
bun run typecheck
bun run test
bun run test:e2e
```

## Structure

- `src/App.vue`: UI shell (HUD + score).
- `src/components/GameCanvas.vue`: Vue component that mounts/unmounts the Pixi canvas.
- `src/game/createGameApp.ts`: Pixi engine bootstrap (app, ticker, resize).
- `src/game/scenes/MainScene.ts`: main scene (display list, interactions, update).
- `src/game/systems/scoreSystem.ts`: testable score logic.

## Notes

- The boilerplate is ready to keep game logic (`src/game`) separate from UI (`src/components`, `src/App.vue`).
- You can add an entity/scene system in `src/game` without changing the Vue layer.

## License

- The source code of this project is licensed under MIT (see `LICENSE`).

## References

- Best practices collection: `BEST_PRACTICES.md`
