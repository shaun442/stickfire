import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Color3, Color4 } from "@babylonjs/core/Maths/math.color";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { Scene } from "@babylonjs/core/scene";

export class World {
  constructor(scene: Scene) {
    // Sky
    scene.clearColor = new Color4(0.53, 0.81, 0.98, 1);

    // Light
    const light = new HemisphericLight(
      "sun",
      new Vector3(0, 1, 0),
      scene
    );

    light.intensity = 1.3;

    // Ground
    const ground = MeshBuilder.CreateGround(
      "ground",
      {
        width: 200,
        height: 200,
      },
      scene
    );

    const groundMat = new StandardMaterial(
      "groundMat",
      scene
    );

    groundMat.diffuseColor = new Color3(
      0.25,
      0.75,
      0.3
    );

    ground.material = groundMat;

    // Random obstacles
    for (let i = 0; i < 60; i++) {
      const height = Math.random() * 6 + 2;
      const box = MeshBuilder.CreateBox(
        "box" + i,
        {
          width: 3,
          height,
          depth: 3,
        },
        scene
      );

      box.position.x = Math.random() * 180 - 90;
      box.position.z = Math.random() * 180 - 90;
      box.position.y = height / 2;

      const mat = new StandardMaterial(
        "boxMat" + i,
        scene
      );

      mat.diffuseColor = new Color3(
        0.55,
        0.55,
        0.55
      );

      box.material = mat;
    }
  }
}
