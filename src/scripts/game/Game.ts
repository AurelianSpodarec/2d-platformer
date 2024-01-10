import * as PIXI from "pixi.js";
import { App } from "@/scripts/system/App";

export class Game {
  constructor() {
    this.container = new PIXI.Container();
    // this.container.addChild(this.board.container);
    this.start()
  }

  start() {
    console.log("wgamee")
    const bunny = PIXI.Sprite.from('https://pixijs.com/assets/bunny.png')
    // App.stage.addChild(bunny);
    bunny.anchor.set(0.5);
    // bunny.x = App.screen.width / 2;
    // bunny.y = App.screen.height / 2;

    this.container.addChild(bunny)
  }
}
