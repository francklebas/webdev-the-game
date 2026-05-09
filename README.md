# Boilerplate Vue + PixiJS

Base de depart pour creer un jeu video web avec Vue 3 (UI/HUD) et PixiJS (rendu 2D GPU).

## Lancer le projet

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

- `src/App.vue`: shell de l'interface (HUD + score).
- `src/components/GameCanvas.vue`: composant Vue qui monte/demonte le canvas Pixi.
- `src/game/createGameApp.ts`: bootstrap du moteur Pixi (app, ticker, resize).
- `src/game/scenes/MainScene.ts`: scene principale (display list, interactions, update).
- `src/game/systems/scoreSystem.ts`: logique testable de score.

## Notes

- Le boilerplate est pret pour separer la logique de jeu (`src/game`) de l'interface (`src/components`, `src/App.vue`).
- Tu peux ajouter un systeme d'entites/scenes dans `src/game` sans toucher a la couche Vue.

## Licence

- Le code source de ce projet est sous licence MIT (voir `LICENSE`).
