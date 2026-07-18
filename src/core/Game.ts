import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { Engine } from "@babylonjs/core/Engines/engine";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { Scene } from "@babylonjs/core/scene";

import { World } from "../world/World";

export class Game {
  private readonly engine: Engine;
  private readonly scene: Scene;

  constructor(canvas: HTMLCanvasElement) {
    this.engine = new Engine(canvas, true);
    this.scene = new Scene(this.engine);

    new ArcRotateCamera(
      "previewCamera",
      Math.PI / 4,
      Math.PI / 3,
      32,
      Vector3.Zero(),
      this.scene
    ).attachControl(canvas, true);

    new World(this.scene);

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });

    window.addEventListener("resize", () => {
      this.engine.resize();
    });
  }
}
