export class Input {
  private readonly keys: Set<string> = new Set();
  private readonly justPressedKeys: Set<string> = new Set();
  private readonly justReleasedKeys: Set<string> = new Set();
  private _mouseDeltaX = 0;
  private _mouseDeltaY = 0;
  private _pointerLocked = false;

  constructor() {
    window.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("keyup", this.onKeyUp);
    document.addEventListener("pointerlockchange", this.onPointerLockChange);
  }

  get pointerLocked(): boolean {
    return this._pointerLocked;
  }

  get mouseDeltaX(): number {
    return this._mouseDeltaX;
  }

  get mouseDeltaY(): number {
    return this._mouseDeltaY;
  }

  isDown(key: string): boolean {
    return this.keys.has(key);
  }

  wasJustPressed(key: string): boolean {
    return this.justPressedKeys.has(key);
  }

  wasJustReleased(key: string): boolean {
    return this.justReleasedKeys.has(key);
  }

  requestPointerLock(element: HTMLElement): void {
    element.requestPointerLock();
  }

  exitPointerLock(): void {
    document.exitPointerLock();
  }

  endFrame(): void {
    this._mouseDeltaX = 0;
    this._mouseDeltaY = 0;
    this.justPressedKeys.clear();
    this.justReleasedKeys.clear();
  }

  private onKeyDown = (e: KeyboardEvent): void => {
    if (!this.keys.has(e.code)) {
      this.justPressedKeys.add(e.code);
    }
    this.keys.add(e.code);
  };

  private onKeyUp = (e: KeyboardEvent): void => {
    this.keys.delete(e.code);
    this.justReleasedKeys.add(e.code);
  };

  private onPointerLockChange = (): void => {
    this._pointerLocked = document.pointerLockElement !== null;
  };

  handleMouseMove = (e: MouseEvent): void => {
    if (this._pointerLocked) {
      this._mouseDeltaX += e.movementX;
      this._mouseDeltaY += e.movementY;
    }
  };

  handlePointerLockClick = (): void => {
    if (!this._pointerLocked) {
      this.requestPointerLock(document.getElementById("game-canvas")!);
    }
  };
}