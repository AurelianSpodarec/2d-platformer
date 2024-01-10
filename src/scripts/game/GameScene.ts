import * as PIXI from "pixi.js";
import { App } from "@/scripts/system/App";
import { Player } from "../objects/Player";

export class Game {
  constructor() {
    this.container = new PIXI.Container();
    this.player = new Player();
    this.start();
  }

  start() {
    // this.container.addChild(this.player)
    console.log(this.player)
    // console.log()
    // const player = new Player();

    this.container.addChild(this.player.createMe()); 
    // const player = new PIXI.Graphics()
    // player.beginFill(0xffffff);
    // player.drawCircle(30, 30, 30);
    // player.endFill();
    // player.x = App.app.screen.width / 2;
    // player.y = App.app.screen.height / 2;

    // this.container.addChild(this.player)
  }
}
