import * as PIXI from "pixi.js";
import { App } from "../engine/App";
import { IWorld } from "../interface/IWorld";
import TILE_TYPES from "../constants/TileTypes";
import DATA_WORLDS from "../fakeData/worlds";

export class World {
  private map: [];

  constructor(world) {
    this.loadWorld = this.loadWorld();
    this.world = {};
    this.worldContainer = new PIXI.Container;
  }

  // ===========================================================
  // Startup
  // ===========================================================

  createNewWorld(title, width, height) {
    const map = this.compileMapForRender(this.generateEmptyWorld(width, height));

    this.world = {
      name: title || "New World Title",
      width: width,
      height: height,
      ownedBy: 0,
      map: map
    }
    console.log("this.world2, ", this.world)
  }

  fetchWorld() {
    return res = DATA_WORLDS[0]
  }

  loadWorld() {
    // CHeck is world loaded
    // Load the data of the world, map etc
    const worldExists = false
    if(false) {

    } else {
      this.createNewWorld("New world", 30,30)
      this.worldContainer = this.renderWorld();
    }
  }

  // ===========================================================
  //  World Functions
  // ===========================================================

  generateEmptyWorld(rows, cols) {
    const map = {
      height: cols,
      width: rows,
      layers: []
    }
    
    const background = Array.from({ length: rows * cols }).fill(0);
    map.layers[0] = background
    
    const foreground = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (i === 0 || i === rows - 1 || j === 0 || j === cols - 1) {
          foreground.push(1);
        } else {
          foreground.push(0);
        }
      }
    }
    map.layers[1] = foreground
  
    return map;
  }

  private compileMapForRender(mapData: IWorld) {
    // console.log("generate a world", this.generateEmptyWorld(10, 10))
    const map = Array(mapData.width * mapData.height).fill(null)
    return mapData.layers.reduce((accumulator, tileIDs, layerIndex) => {
      tileIDs.forEach((tileID, tileIndex) => {
        const tileData = TILE_TYPES[tileID]
        if (!tileData) return

        if (!accumulator[tileIndex]) {
          accumulator[tileIndex] = []
        }
  
        accumulator[tileIndex][layerIndex] = tileData
      })
  
      return accumulator
    }, map)
  }
  
  private renderWorld(mapWidth = 10) {
    const tileWidth = 16;
    const tileHeight = 16;
    const container = new PIXI.Container();
    let cellIndex = 0;

    while (cellIndex < this.world.map.length) {
      const tileStack = this.world.map[cellIndex];

      const cellX = cellIndex % this.world.width;
      const cellY = Math.floor(cellIndex / this.world.width);

      const x = cellX * tileWidth;
      const y = cellY * tileHeight;
      // console.log("cellIndex", )
      if (tileStack) {
        tileStack.forEach((tile, layerIndex) => {

          if (tile?.texture) {
            const texture = PIXI.Texture.from(tile.texture);
            const sprite = new PIXI.Sprite(texture);
            sprite.position.set(x, y);
            container.addChild(sprite);
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

    
  // ===========================================================
  //  Event Listeners Handlers
  // ===========================================================
  
  private handleTileMouseOver() {

  }
  
  private handleTileMouseOut() {
    
  }

}
































  // private renderTile({ tile, x, y, container, cellY, mapWidth, cellX, map }) {
  //   const texture = PIXI.Texture.from(tile.texture);
  //   const sprite = new PIXI.Sprite(texture);

  //   sprite.position.set(x, y);
  //   container.addChild(sprite);

  //   sprite.interactive = true;
  //   sprite.buttonMode = true;

  //   sprite.on('mouseover', function () {
  //     // console.log({ tileStack, cellIndex, cellX, cellY, tile, layerIndex })
  //     // console.log("realIndex", (cellX) * (cellY)
  //     console.log("hi")

  //     // function updateCell(cellX, cellY, tileType) {
  //       const cellIndex = (cellY * mapWidth) + cellX
  //       const tileStack = map[cellIndex]
      
  //       tileStack[1] = 0
  //     // }
  //   })
  // }



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




// private highlightTile() {

// }