'use client'

import * as PIXI from "pixi.js";

class Application {
  run(config) {
    this.config = config;

    this.app = new PIXI.Application({
      background: '#1099bb',
      resizeTo: window
    });
    document.body.appendChild(this.app.view);

    this.start();
  }

  start() {
    this.scene = new this.config["startScene"]();
    this.app.stage.addChild(this.scene.container)
  }
}


export const App = new Application();
