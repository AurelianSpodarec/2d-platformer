'use client'

import * as PIXI from "pixi.js";
import { ScenesManager } from "./ScenesManager";

class Application {
  run(config) {
    this.config = config;

    this.app = new PIXI.Application({
      background: '#1099bb',
      resizeTo: window
    });
    document.body.appendChild(this.app.view);
    
    this.scenes = new ScenesManager();
    this.app.stage.interactive = true;
    this.app.stage.addChild(this.scenes.container);


    this.start();
  }

  update(delta) {
    this.scenes.update(delta);
  }

  start() {
    this.scenes.start("Game");
  }
}


export const App = new Application();
