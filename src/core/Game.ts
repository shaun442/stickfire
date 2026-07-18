import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";

import { Input } from "./input";
import { PlayerController } from "./playercontroller";
import { Stickman } from "../entities/stickman";
import { Crosshair } from "../ui/crosshair";
import { World } from "../world/World";

export class Game {
  private readonly engine: Engine;
  private readonly scene: Scene;
  private readonly input: Input;
  private readonly player: PlayerController;
  private readonly stickman: Stickman;

  constructor(canvas: HTMLCanvasElement, uiRoot: HTMLElement) {
    this.engine = new Engine(canvas, true, { disableWebGL2Support: true });
    this.scene = new Scene(this.engine);
    this.input = new Input();

    canvas.addEventListener("click", this.input.handlePointerLockClick);
    document.addEventListener("mousemove", this.input.handleMouseMove);

    new World(this.scene);
    this.player = new PlayerController(this.scene, this.input);
    this.stickman = new Stickman(this.scene);
    new Crosshair(uiRoot);

    this.engine.runRenderLoop(() => {
      const dt = Math.min(this.engine.getDeltaTime() / 1000, 0.05);
      this.player.update(dt);
      this.stickman.update(
        this.player.position,
        this.player.yaw,
        this.input.isDown("KeyW") || this.input.isDown("KeyS") || this.input.isDown("KeyA") || this.input.isDown("KeyD"),
        this.player.onGround,
        dt
      );
      this.input.endFrame();
      this.scene.render();
    });

    window.addEventListener("resize", () => this.engine.resize());
  }

  dispose(): void {
    this.engine.dispose();
  }
}