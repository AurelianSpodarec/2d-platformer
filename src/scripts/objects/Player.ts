import * as PIXI from "pixi.js";
import { App } from "../system/App";

export class Player {
  constructor() {
    this.createMe();
    this.x = 16;
    this.y = 16;
    this.width = 16;
    this.height = 16;
    this.size = 16;
    this.vel = { x: 0.15, y: 0.15 };
    this.setupKeyboardEvents();
  }

  setupKeyboardEvents() {
    document.addEventListener('keydown', this.handleKeyPress.bind(this));
    document.addEventListener('keyup', this.handleKeyPress.bind(this));
  }

  handleKeyPress(event) {
    const keyState = event.type === 'keydown' ? 1 : 0;

    switch (event.key.toLowerCase()) {
      case 'w':
        this.vel.y = -keyState;
        break;
      case 's':
        this.vel.y = keyState;
        break;
      case 'a':
        this.vel.x = -keyState;
        break;
      case 'd':
        this.vel.x = keyState;
        break;
    }
  }

  createMe() {
    const me = new PIXI.Graphics()
    me.beginFill(0xffffff);
    me.drawCircle(30, 30, 30);
    me.endFill();
    me.x = App.app.screen.width / 2;
    me.y = App.app.screen.height / 2;
    return me;
  }

  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  destroy() {

  }
}
