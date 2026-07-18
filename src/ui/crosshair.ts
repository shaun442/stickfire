export class Crosshair {
  private readonly element: HTMLDivElement;

  constructor(parent: HTMLElement) {
    this.element = document.createElement("div");
    this.element.id = "crosshair";
    this.element.innerHTML = `
      <div class="crosshair-line crosshair-top"></div>
      <div class="crosshair-line crosshair-right"></div>
      <div class="crosshair-line crosshair-bottom"></div>
      <div class="crosshair-line crosshair-left"></div>
      <div class="crosshair-dot"></div>
    `;
    parent.append(this.element);
  }
}