import * as PIXI from "pixi.js";
import { App } from "@/scripts/system/App";
import { Player } from "../objects/Player";

export class Game {
  constructor() {
    this.container = new PIXI.Container();
    this.player = new Player();
    this.start();
  }

  update(dt) {
    this.player.update(dt)
  }

  start() {
    this.container.addChild(this.player.createMe()); 
  }
}
