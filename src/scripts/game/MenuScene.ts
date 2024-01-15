import * as PIXI from "pixi.js";
import DATA_WORLDS from "../fakeData/worlds";

export class Menu {
  constructor() {
    this.container = new PIXI.Container();
    this.renderMenu();
  }

  renderMenu() {

    DATA_WORLDS.forEach((world, index) => {
      const worldText = new PIXI.Text(`${index + 1}. ${world.title}`, {
        fontFamily: 'Roboto Mono',
        fill: 0xFFFFFF,
        fontSize: 24
      });
      worldText.x = screen.width / 2 - 100;
      worldText.y = 200 + index * 40;
      this.container.addChild(worldText);
    });

  }

  start() {
    this.container.addChild(this.renderMenu())
  }
}
