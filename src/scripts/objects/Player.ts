import * as PIXI from "pixi.js";
import { App } from "../system/App";

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


    this.position.set(this.size / 2 + 16,this.size / 2 + 16);
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
    // this.velocity.y += this.gravity;

    // // Update player position based on velocity
    // this.position.x += this.velocity.x;
    // this.position.y += this.velocity.y;
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


    // Check for collisions with the world map
    // this.checkWorldCollisions();
    
    this.me.position.copyFrom(this.position);
  }

  // checkWorldCollisions() {
  //   // Assuming tileSize is the size of your tiles in the world
  //   const tileSize = App.tileSize;

  //   // Calculate the player's grid position in the world
  //   const gridX = Math.floor(this.position.x / tileSize);
  //   const gridY = Math.floor(this.position.y / tileSize);

  //   // Check if the player is on a wall tile (assuming 1 represents a wall)
  //   if (this.worldMap[gridY][gridX] === 1) {
  //     // If on a wall, stop falling and set the player on top of the wall
  //     this.velocity.y = 0;
  //     this.position.y = gridY * tileSize;
  //     this.isJumping = false;
  //   }
  // }

   // Add a jump method if needed
   jump() {
    if (!this.isJumping) {
      this.velocity.y = -10; // Adjust jump strength
      this.isJumping = true;
    }
  }

  destroy() {

  }
}
