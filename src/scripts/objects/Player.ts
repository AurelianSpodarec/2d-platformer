import * as PIXI from "pixi.js";
import { App } from "../engine/App";

class InputHandler {
  constructor() {
    this.keys = []
  }

  handleKeyPress() {

  }

  handleKeyUp() {

  }

}

// input.includes('ArrowRight)

export class Player {
  private me: PIXI.Graphics;
  private position: PIXI.Point = new PIXI.Point();
  private keyState: { [key: string]: number } = {};

  constructor(worldMap) {
    this.me = this.createMe();

    App.app.ticker.add(this.update, this);

    this.width = 16;
    this.height = 16;
    this.size = 16;

    this.gravity = 0.5;
    this.isJumping = false;
    this.vel = { x: 0.15, y: 0.15 };
    this.worldMap = worldMap;


    this.position.set(this.size / 2 + 16, this.size / 2 + 16);
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
      case 'arrowup':
        // Input.includes["ArrowLeft"]
        this.keyState['w'] = keyState;
        break;
      case 's':
      case 'arrowdown':
        this.keyState['s'] = keyState;
        break;
      case 'a':
      case 'arrowleft':
        this.keyState['a'] = keyState;
        break;
      case 'd':
      case 'arrowright':
        this.keyState['d'] = keyState;
        break;
    }
  }

  createMe() {
    const me = new PIXI.Graphics()
    me.beginFill(0xffffff);

    me.drawCircle(me.width / 2, me.height / 2, 16 / 2);
    me.endFill();

    const texture = PIXI.Texture.from('assets/smileys/smile.png');
    const image = new PIXI.Sprite(texture);
    image.anchor.set(0.5);

    me.x = this.position.x;
    me.y = this.position.y;

    return image;
  }

  update() {
    // Move Up, Right, Bottom, Left - instead of this mss maybe
    if (this.keyState['w'] || this.keyState['ArrowUp']) {
      this.position.y -= 10;
    }
    if (this.keyState['s'] || this.keyState['ArrowDown']) {
      this.position.y += 10;
    }
    if (this.keyState['a'] || this.keyState['ArrowLeft']) {
      this.position.x -= 10;
    }
    if (this.keyState['d'] || this.keyState['ArrowRight']) {
      this.position.x += 10;
    }

    this.me.position.copyFrom(this.position);
  }

  jump() {
    if (!this.isJumping) {
      this.velocity.y = -10; // Adjust jump strength
      this.isJumping = true;
    }
  }

  destroy() {

  }
}
