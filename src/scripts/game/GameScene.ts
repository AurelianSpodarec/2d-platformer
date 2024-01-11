import * as PIXI from "pixi.js";
import { App } from "@/scripts/system/App";
import { Player } from "../objects/Player";
import { World } from "../objects/World";

export class Game {
  constructor() {
    this.container = new PIXI.Container();
    this.player = new Player();
    this.world = new World();

    this.start();
  }

  update(dt) {
    this.player.update(dt)
  }

  start() {
    this.container.addChild(this.player.me); 
    this.container.addChild(this.world.getWorldContainer())
  }
}
