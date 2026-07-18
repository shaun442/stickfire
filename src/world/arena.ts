import { Color3 } from "@babylonjs/core/Maths/math.color";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { Scene } from "@babylonjs/core/scene";

export class Arena {
  constructor(scene: Scene) {
    this.buildWalls(scene);
    this.buildPlatforms(scene);
  }

  private buildWalls(scene: Scene): void {
    const wallMat = new StandardMaterial("wallMat", scene);
    wallMat.diffuseColor = new Color3(0.4, 0.4, 0.45);

    const half = 50;
    const height = 8;
    const thickness = 1;

    const walls: { x: number; z: number; w: number; d: number }[] = [
      { x: 0, z: -half, w: half * 2, d: thickness },
      { x: 0, z: half, w: half * 2, d: thickness },
      { x: -half, z: 0, w: thickness, d: half * 2 },
      { x: half, z: 0, w: thickness, d: half * 2 },
    ];

    for (const w of walls) {
      const mesh = MeshBuilder.CreateBox("wall", { width: w.w, height, depth: w.d }, scene);
      mesh.position.set(w.x, height / 2, w.z);
      mesh.material = wallMat;
    }
  }

  private buildPlatforms(scene: Scene): void {
    const platMat = new StandardMaterial("platMat", scene);
    platMat.diffuseColor = new Color3(0.35, 0.35, 0.4);

    const positions = [
      { x: -20, z: -20, s: 6, h: 2 },
      { x: 20, z: 20, s: 6, h: 2 },
      { x: -20, z: 20, s: 6, h: 4 },
      { x: 20, z: -20, s: 6, h: 4 },
      { x: 0, z: 0, s: 4, h: 1.5 },
    ];

    for (const p of positions) {
      const mesh = MeshBuilder.CreateBox("platform", { width: p.s, height: p.h, depth: p.s }, scene);
      mesh.position.set(p.x, p.h / 2, p.z);
      mesh.material = platMat;
    }
  }
}