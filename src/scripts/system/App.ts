'use client'

import * as PIXI from "pixi.js";
import { ScenesManager } from "./ScenesManager";
import { Loader } from "./Loader";

class Application {
  run(config) {
    this.config = config;

    this.app = new PIXI.Application({
      background: '#1099bb',
      resizeTo: window
    });
    document.body.appendChild(this.app.view);

    // this.loader = new Loader(this.app.loader, this.config);
    this.start();
  }

  start() {
    this.scene = new this.config["startScene"]();
    this.app.stage.addChild(this.scene.container)
  }
}


export const App = new Application();
