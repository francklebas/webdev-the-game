import { Application, FederatedPointerEvent } from "pixi.js";
import { MainScene } from "./scenes/MainScene";

type GameOptions = {
  onScoreTick?: (value: number) => void;
};

export type GameHandle = {
  destroy: () => Promise<void>;
};

export async function createGameApp(
  host: HTMLElement,
  { onScoreTick }: GameOptions = {},
): Promise<GameHandle> {
  const app = new Application();

  await app.init({
    resizeTo: host,
    backgroundAlpha: 0,
    antialias: true,
  });

  host.appendChild(app.canvas);

  const scene = new MainScene({ onScoreTick });
  app.stage.addChild(scene.root);

  const updateLayout = (): void => {
    const { width, height } = app.renderer;
    scene.resize(width, height);
  };

  const onPointerMove = (event: FederatedPointerEvent): void => {
    scene.onPointerMove(event.data.global);
  };

  app.stage.eventMode = "static";
  app.stage.hitArea = app.screen;
  app.stage.on("pointermove", onPointerMove);

  const tickerFn = (): void => scene.update(app.ticker.deltaTime);

  app.ticker.add(tickerFn);
  updateLayout();

  const resizeObserver = new ResizeObserver(updateLayout);
  resizeObserver.observe(host);

  return {
    async destroy() {
      resizeObserver.disconnect();
      app.stage.off("pointermove", onPointerMove);
      app.ticker.remove(tickerFn);
      scene.destroy();
      await app.destroy(true, { children: true });
    },
  };
}
