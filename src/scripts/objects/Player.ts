import * as PIXI from "pixi.js";
import { App } from "../system/App";

export class Player {
  private me: PIXI.Graphics;
  private position: PIXI.Point = new PIXI.Point();
  private keyState: { [key: string]: number } = {};

  constructor() {
    this.me = this.createMe();

    App.app.ticker.add(this.update, this);

    this.width = 16;
    this.height = 16;
    this.size = 16;
    this.vel = { x: 0.15, y: 0.15 };
    
    this.position.set(App.app.screen.width / 2 - this.width, App.app.screen.height / 2 - this.height);
    this.setupKeyboardEvents();
  }

  setupKeyboardEvents() {
    console.log("events")
    document.addEventListener('keydown', this.handleKeyPress.bind(this));
    document.addEventListener('keyup', this.handleKeyPress.bind(this));
  }

  handleKeyPress(event) {
    const keyState = event.type === 'keydown' ? 1 : 0;

    switch (event.key.toLowerCase()) {
      case 'w':
        this.keyState['w'] = keyState;
        break;
      case 's':
        this.keyState['s'] = keyState;
        break;
      case 'a':
        this.keyState['a'] = keyState;
        break;
      case 'd':
        this.keyState['d'] = keyState;
        break;
    }
  }

  createMe() {
    const me = new PIXI.Graphics()
    me.beginFill(0xffffff);
    me.drawCircle(30, 30, 30);
    me.endFill();
    me.x = this.position.x;
    me.y = this.position.y;
    return me;
  }

  update() {
    console.log("@'''''''''''''''''''''''''''''''", this.position)
    if (this.keyState['w']) {
      this.position.y += 10;
    }
    if (this.keyState['s']) {
      this.position.y -= 10;
    }
    if (this.keyState['a']) {
      this.position.x -= 10;
    }
    if (this.keyState['d']) {
      this.position.x += 10;
    }
    // this.me.position.copyFrom(this.position);
  }

  destroy() {

  }
}
