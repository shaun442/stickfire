import {
  Engine,
  Scene,
} from "@babylonjs/core";

import { Player } from "./Player";
import { World } from "./World";

export class Game {
  engine: Engine;
  scene: Scene;

  player: Player;
  world: World;

  constructor(canvas: HTMLCanvasElement) {
    this.engine = new Engine(canvas, true);

    this.scene = new Scene(this.engine);

    this.world = new World(this.scene);

    this.player = new Player(
      canvas,
      this.scene
    );

    this.engine.runRenderLoop(() => {
      this.player.update();

      this.scene.render();
    });

    window.addEventListener("resize", () => {
      this.engine.resize();
    });
  }
}