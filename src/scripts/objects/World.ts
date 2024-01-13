import * as PIXI from "pixi.js";
import { App } from "../system/App";


const DATA_WORLDS = [
  {
    name: "First ever world",
    layers: [
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ],
      [
        2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
        2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
        2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
        2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2,
        2, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 2,
        2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
      ],
    ],
  }
]



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

function generateDefaultMap(width, height) {
  const outerWall = Array(width).fill(1);
  const innerEmpty = Array(width - 2).fill(0);

  const layers = [
    outerWall,
    ...Array(height - 2).fill(innerEmpty),
    outerWall,
  ];

  return {
    tileSize: 16,
    height,
    width,
    layers,
  };
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
  tileSize: 16,
  height: 6, // Number of cells on the Y axis
  width: 12, // Number of cells on the X axis
  layers: [// create a basic world automatically e.g. 400x200 with the outer space to have a wall
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
      2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
      2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
      2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2,
      2, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 2,
      2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
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

  private generateDefaultMap(width, height) {
    const outerWall = Array(width).fill(1);
    const innerEmpty = Array(width - 2).fill(0);

    const layers = [
      outerWall,
      ...Array(height - 2).fill(innerEmpty),
      outerWall,
    ];

    return {
      tileSize: 16,
      height,
      width,
      layers,
    };
  }

  private renderTile() {

  }

  private createWorld(mapWidth = 12, mapHeight) {
    // const mapWidth = 12
    const tileWidth = 16
    const tileHeight = 16
    const container = new PIXI.Container();

    // `while` loops are significantly more efficient than `for` loops
    let cellIndex = 0
    while (cellIndex < this.map.length) {
      // Each item in the compiled map represents a tile stack - i.e. each item
      // in the stack is a tile, and should be rendered in array order at the same
      // position, causing them to overlap each other.
      const tileStack = this.map[cellIndex]

      // Since the map is a 1d array, we can use the cell index to calculate the
      // x/y position of the cell within the world grid.
      const cellX = cellIndex % mapWidth
      const cellY = Math.floor(cellIndex / mapWidth)

      // Multiply the cell's grid position by the size of a tile to get the pixel
      // position of the tile.
      const x = cellX * tileWidth
      const y = cellY * tileHeight

      if (tileStack) {
        // Loop over each tile in the stack, rendering them at the same position.
        tileStack.forEach(tile => {
          if (tile?.texture) {
            const texture = PIXI.Texture.from(tile.texture)
            const sprite = new PIXI.Sprite(texture)

            sprite.position.set(x, y)
            container.addChild(sprite)
          }
        })
      }

      cellIndex += 1
    }

    return container;
  }

  public getWorldContainer() {
    return this.worldContainer;
  }
}

