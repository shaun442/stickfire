import { FreeCamera } from "@babylonjs/core/Cameras/freeCamera";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { Scene } from "@babylonjs/core/scene";

import { Config } from "./config";
import { Input } from "./input";

export class PlayerController {
  private readonly _camera: FreeCamera;
  private readonly input: Input;
  private velocity = Vector3.Zero();
  private _onGround = false;
  private yaw = 0;
  private pitch = 0;

  constructor(scene: Scene, input: Input) {
    this.input = input;

    this._camera = new FreeCamera("playerCamera", new Vector3(0, 1.5, 0), scene);
    this._camera.rotation = Vector3.Zero();
    this._camera.fov = 1.2;
    scene.activeCamera = this._camera;
  }

  get camera(): FreeCamera {
    return this._camera;
  }

  get position(): Vector3 {
    return this._camera.position;
  }

  get forward(): Vector3 {
    return this._camera.getDirection(Vector3.Forward());
  }

  get onGround(): boolean {
    return this._onGround;
  }

  update(dt: number): void {
    this.handleLook();
    this.handleMovement(dt);
    this.applyGravity(dt);
  }

  private handleLook(): void {
    const sens = Config.mouse.sensitivity;
    this.yaw += this.input.mouseDeltaX * sens;
    this.pitch += this.input.mouseDeltaY * sens * (Config.mouse.invertY ? 1 : -1);
    this.pitch = Math.max(-Math.PI / 2 + 0.01, Math.min(Math.PI / 2 - 0.01, this.pitch));

    this._camera.rotation.x = this.pitch;
    this._camera.rotation.y = this.yaw;
  }

  private handleMovement(dt: number): void {
    const speed = this.input.isDown("ShiftLeft")
      ? Config.movement.walkSpeed * Config.movement.sprintMultiplier
      : Config.movement.walkSpeed;

    const forward = new Vector3(
      -Math.sin(this.yaw),
      0,
      -Math.cos(this.yaw)
    ).normalize();

    const right = new Vector3(
      Math.cos(this.yaw),
      0,
      -Math.sin(this.yaw)
    ).normalize();

    let moveDir = Vector3.Zero();

    if (this.input.isDown("KeyW")) moveDir.addInPlace(forward);
    if (this.input.isDown("KeyS")) moveDir.subtractInPlace(forward);
    if (this.input.isDown("KeyA")) moveDir.subtractInPlace(right);
    if (this.input.isDown("KeyD")) moveDir.addInPlace(right);

    if (moveDir.lengthSquared() > 0) {
      moveDir.normalize();
      this.velocity.x = moveDir.x * speed;
      this.velocity.z = moveDir.z * speed;
    } else {
      this.velocity.x *= 0.85;
      this.velocity.z *= 0.85;
    }

    if (this.input.wasJustPressed("Space") && this._onGround) {
      this.velocity.y = Config.movement.jumpVelocity;
      this._onGround = false;
    }

    this._camera.position.addInPlace(this.velocity.scale(dt));
  }

  private applyGravity(dt: number): void {
    this.velocity.y += Config.movement.gravity * dt;

    if (this._camera.position.y <= Config.movement.groundHeight) {
      this._camera.position.y = Config.movement.groundHeight;
      this.velocity.y = 0;
      this._onGround = true;
    }
  }
}