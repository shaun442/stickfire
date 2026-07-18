import {
  Scene,
  HemisphericLight,
  Vector3,
  MeshBuilder,
  Color4,
  StandardMaterial,
  Color3,
} from "@babylonjs/core";

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
      const box = MeshBuilder.CreateBox(
        "box" + i,
        {
          width: 3,
          height: Math.random() * 6 + 2,
          depth: 3,
        },
        scene
      );

      box.position.x = Math.random() * 180 - 90;
      box.position.z = Math.random() * 180 - 90;
      box.position.y = box.scaling.y;

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