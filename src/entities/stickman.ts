import { Color3 } from "@babylonjs/core/Maths/math.color";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode";
import { Scene } from "@babylonjs/core/scene";

export class Stickman {
  private readonly root: TransformNode;
  private readonly head: TransformNode;
  private readonly body: TransformNode;
  private readonly leftArm: TransformNode;
  private readonly rightArm: TransformNode;
  private readonly leftLeg: TransformNode;
  private readonly rightLeg: TransformNode;
  private walkTime = 0;

  constructor(scene: Scene) {
    this.root = new TransformNode("stickmanRoot", scene);

    const mat = new StandardMaterial("stickmanMat", scene);
    mat.diffuseColor = new Color3(1, 1, 1);

    const headMat = new StandardMaterial("headMat", scene);
    headMat.diffuseColor = new Color3(0.2, 0.2, 0.2);

    this.head = new TransformNode("head", scene);
    const headMesh = MeshBuilder.CreateSphere("headMesh", { diameter: 0.4 }, scene);
    headMesh.material = headMat;
    headMesh.parent = this.head;
    this.head.position.y = 1.55;
    this.head.parent = this.root;

    this.body = new TransformNode("body", scene);
    const bodyMesh = MeshBuilder.CreateBox("bodyMesh", { width: 0.25, height: 0.7, depth: 0.15 }, scene);
    bodyMesh.material = mat;
    bodyMesh.parent = this.body;
    this.body.position.y = 1.05;
    this.body.parent = this.root;

    this.leftArm = new TransformNode("leftArm", scene);
    const leftArmMesh = MeshBuilder.CreateBox("leftArmMesh", { width: 0.08, height: 0.5, depth: 0.08 }, scene);
    leftArmMesh.material = mat;
    leftArmMesh.parent = this.leftArm;
    this.leftArm.position.set(-0.25, 1.2, 0);
    this.leftArm.parent = this.root;

    this.rightArm = new TransformNode("rightArm", scene);
    const rightArmMesh = MeshBuilder.CreateBox("rightArmMesh", { width: 0.08, height: 0.5, depth: 0.08 }, scene);
    rightArmMesh.material = mat;
    rightArmMesh.parent = this.rightArm;
    this.rightArm.position.set(0.25, 1.2, 0);
    this.rightArm.parent = this.root;

    this.leftLeg = new TransformNode("leftLeg", scene);
    const leftLegMesh = MeshBuilder.CreateBox("leftLegMesh", { width: 0.1, height: 0.5, depth: 0.1 }, scene);
    leftLegMesh.material = mat;
    leftLegMesh.parent = this.leftLeg;
    this.leftLeg.position.set(-0.1, 0.65, 0);
    this.leftLeg.parent = this.root;

    this.rightLeg = new TransformNode("rightLeg", scene);
    const rightLegMesh = MeshBuilder.CreateBox("rightLegMesh", { width: 0.1, height: 0.5, depth: 0.1 }, scene);
    rightLegMesh.material = mat;
    rightLegMesh.parent = this.rightLeg;
    this.rightLeg.position.set(0.1, 0.65, 0);
    this.rightLeg.parent = this.root;
  }

  get position(): Vector3 {
    return this.root.position;
  }

  set position(v: Vector3) {
    this.root.position.copyFrom(v);
  }

  update(position: Vector3, yaw: number, moving: boolean, onGround: boolean, dt: number): void {
    this.root.position.copyFrom(position);
    this.root.position.y -= 1.6;
    this.root.rotation.y = yaw;

    const speed = moving && onGround ? 5 : 0;
    this.walkTime += dt * speed;

    if (moving && onGround) {
      const swing = Math.sin(this.walkTime);
      this.leftLeg.rotation.x = swing * 0.5;
      this.rightLeg.rotation.x = -swing * 0.5;
      this.leftArm.rotation.x = -swing * 0.4;
      this.rightArm.rotation.x = swing * 0.4;
    } else {
      this.leftLeg.rotation.x = 0;
      this.rightLeg.rotation.x = 0;
      this.leftArm.rotation.x = 0;
      this.rightArm.rotation.x = 0;
    }
  }
}