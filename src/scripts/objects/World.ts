import * as PIXI from "pixi.js";
import { App } from "../system/App";
import { IWorld } from "../interface/IWorld";
import TILE_TYPES from "../constants/TileTypes";


// TODO: Create Empty world with: 25x100, 75x20, 100x100

// TODO: Player can create a world e.g. 20x500
// TODO: Player can load a world that already exist

function generateArray(rows = 20, cols = 10) {
  const map = {
    height: cols,
    width: rows,
    layers: []
  }

  const background = Array.from({ length: rows * cols }).fill(0);
  map.layers[0] = background

  const interactive = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (i === 0 || i === rows - 1 || j === 0 || j === cols - 1) {
        interactive.push(1);
      } else {
        interactive.push(0);
      }
    }
  }
  map.layers[1] = interactive

  return map;
}


// function getPositionOfTile(map) {

// }

// function getPositionOfTileStack(map) {
//   // Layer
// }

function compileMapForRender(mapData: IWorld) {

  console.log("generate a world", generateArray(10, 10))
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


const createEmptyMap = compileMapForRender(generateArray())
console.log("create empty map", createEmptyMap)


// class Tile {
//   renderTile
//   highlightTile
//  
// }

export class World {
  private worldContainer: PIXI.Container;
  private map: [];

  constructor() {
    this.map = createEmptyMap;
    this.worldContainer = this.createWorld();
  }

  // ===========================================================
  //  Event Listeners Handlers
  // ===========================================================

  private handleTileMouseOver() {

  }

  private handleTileMouseOut() {

  }

  // ===========================================================
  //  Class Functions
  // ===========================================================

  private highlightTile() {

  }

  private renderTile({ tile, x, y, container }) {
    const texture = PIXI.Texture.from(tile.texture);
    const sprite = new PIXI.Sprite(texture);

    sprite.position.set(x, y);
    container.addChild(sprite);

    sprite.interactive = true;
    sprite.buttonMode = true;

    sprite.on('mouseover', function () {
      // console.log({ tileStack, cellIndex, cellX, cellY, tile, layerIndex })
      // console.log("realIndex", (cellX) * (cellY)
      console.log("hi")
    })
  }

  private createWorld(mapWidth = 10) {
    const tileWidth = 16;
    const tileHeight = 16;
    const container = new PIXI.Container();
    let cellIndex = 0;

    while (cellIndex < this.map.length) {
      const tileStack = this.map[cellIndex];

      const cellX = cellIndex % mapWidth;
      const cellY = Math.floor(cellIndex / mapWidth);

      const x = cellX * tileWidth;
      const y = cellY * tileHeight;
      // console.log("cellIndex", )
      if (tileStack) {
        tileStack.forEach((tile, layerIndex) => {

          if (tile?.texture) {
            this.renderTile({ tile, x, y, container })
          }

        });
      }

      cellIndex += 1;
    }

    return container;
  }


  public getWorldContainer() {
    return this.worldContainer;
  }
}


// private renderTile() {//renderTile() {
//   const container = new PIXI.Container();

//   console.log(this.map)
//   for (const tile of this.map) {
//     // const texture = { tile };
//     if ('opacity' in tile) {
//       // texture.setOpacity(tile.opacity);
//     }

//     if (!('hidden' in tile)) {
//       const a = PIXI.Texture.from(tile.texture);
//       container.addChild(new PIXI.Sprite(a));
//     }
//   }
//   return container;
// }