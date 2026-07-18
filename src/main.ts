import "./style.css";
import { Game } from "./core/Game";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("The game root element is missing.");
}

const canvas = document.createElement("canvas");
canvas.id = "game-canvas";
canvas.setAttribute("aria-label", "StickFire game preview");
app.append(canvas);

new Game(canvas, app);
