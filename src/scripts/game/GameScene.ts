import * as PIXI from "pixi.js";
import { World } from "../objects/World";
import DATA_WORLDS from "../fakeData/worlds";

export class Game {
  constructor() {
    this.container = new PIXI.Container();
    this.world = new World();
    
    this.start();
  }
  
  update(dt) {
    // this.player.setWorldMap(this.world.getMap());
  }

  start() {
    this.container.addChild(this.world.renderWorld())
  }
}
