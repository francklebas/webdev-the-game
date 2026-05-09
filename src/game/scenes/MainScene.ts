import { Container, Graphics, PointData, Text, TextStyle } from "pixi.js";
import { stepScoreAccumulator } from "../systems/scoreSystem";

const SCORE_THRESHOLD = 30;
const HIT_DISTANCE = 46;

type MainSceneOptions = {
  onScoreTick?: (value: number) => void;
};

export class MainScene {
  root: Container;
  private onScoreTick?: (value: number) => void;
  private time: number;
  private scoreAccumulator: number;
  private player: Graphics;
  private target: Graphics;
  private hint: Text;

  constructor({ onScoreTick }: MainSceneOptions = {}) {
    this.root = new Container();
    this.onScoreTick = onScoreTick;
    this.time = 0;
    this.scoreAccumulator = 0;

    this.player = new Graphics().circle(0, 0, 22).fill(0xffdf6e);
    this.target = new Graphics().roundRect(-30, -18, 60, 36, 8).fill(0xff7b66);

    const uiStyle = new TextStyle({
      fontFamily: "Space Grotesk, Segoe UI, sans-serif",
      fontSize: 18,
      fill: 0xffffff,
    });
    this.hint = new Text({ text: "Bouge la souris pour jouer", style: uiStyle });

    this.root.addChild(this.target);
    this.root.addChild(this.player);
    this.root.addChild(this.hint);
  }

  resize(width: number, height: number): void {
    this.root.position.set(width / 2, height / 2);
    this.hint.position.set(-width / 2 + 16, -height / 2 + 16);
  }

  onPointerMove(globalPoint: PointData): void {
    this.player.x = globalPoint.x - this.root.x;
    this.player.y = globalPoint.y - this.root.y;
  }

  update(delta: number): void {
    this.time += 0.02 * delta;
    this.target.x = Math.sin(this.time) * 180;
    this.target.y = Math.cos(this.time * 1.4) * 90;

    const dx = this.player.x - this.target.x;
    const dy = this.player.y - this.target.y;
    const distance = Math.hypot(dx, dy);

    if (distance < HIT_DISTANCE) {
      const state = stepScoreAccumulator(this.scoreAccumulator, delta, SCORE_THRESHOLD);
      this.scoreAccumulator = state.accumulator;

      if (state.scored) {
        this.onScoreTick?.(1);
      }

      this.target.tint = 0x76ffb0;
      return;
    }

    this.target.tint = 0xffffff;
  }

  destroy(): void {
    this.root.destroy({ children: true });
  }
}
