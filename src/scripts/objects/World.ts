import * as PIXI from "pixi.js";
import { App } from "../system/App";

const TILE_TYPES = {
  0: {
    opacity: 1,
    texture: '/assets/tiles/empty.png',
  },
  1: {
    opacity: 0.5,
    texture: 'assets/tiles/wall.png',
  },
  2: {
    opacity: 1,
    texture: 'assets/tiles/wall.png',
  },
}


function compileMapForRender(mapData) {
  // Create an array based on the map size as determined by the width and
  // height, then fill it with nulls
  const map = Array(mapData.width * mapData.height).fill(null)

  // Update the map with the actual tiles to be rendered at each coordinate
  return mapData.layers.reduce((accumulator, tileIDs, layerIndex) => {
    tileIDs.forEach((tileID, tileIndex) => {
      const tileData = TILE_TYPES[tileID]

      if (!tileData) return

      // Create an array if necessary to represent our tile stack
      if (!accumulator[tileIndex]) {
        accumulator[tileIndex] = []
      }

      accumulator[tileIndex][layerIndex] = tileData
    })

    return accumulator
  }, map)
}

const compiledMap = compileMapForRender({
  height: 4, // Number of cells on the Y axis
  width: 4, // Number of cells on the X axis
  layers: [
    // Layer 1
    [
      0, 0, 0, 0,
      0, 1, 1, 0,
      0, 1, 1, 0,
      0, 0, 0, 0,
    ],
    // Layer 2
    [
      2, 2, 2, 2,
      2, 0, 0, 2,
      2, 0, 0, 2,
      2, 2, 2, 2,
    ],
  ],
})


export class World {
  private worldContainer: PIXI.Container;
  private map: [];

  constructor() {
    this.map = compiledMap;

    this.worldContainer = this.createWorld();
  }


  private createWorld() {//renderTile() {
    const container = new PIXI.Container();

    console.log(this.map)
    for (const tile of this.map.flat()) {
      // const texture = { tile };
      if ('opacity' in tile) {
        // texture.setOpacity(tile.opacity);
      }

      if (!('hidden' in tile)) {
        const a = PIXI.Texture.from(tile.texture);
        container.addChild(new PIXI.Sprite(a));
      }
    }
    return container;
  }

  // private createWorld() {
  //   const container = new PIXI.Container();

  //   for (let row = 0; row < this.map.world.length; row++) {
  //     for (let col = 0; col < this.map.world[row].length; col++) {
  //       const tileValue = this.map.world[row][col];
  //       const texture = this.renderTile(tileValue);

  //       const tile = new PIXI.Sprite(texture);
  //       tile.width = this.tileSize;
  //       tile.height = this.tileSize;
  //       tile.x = col * this.tileSize;
  //       tile.y = row * this.tileSize;

  //       container.addChild(tile);
  //     }
  //   }

  //   return container;
  // }

  public getWorldContainer() {
    return this.worldContainer;
  }
}

