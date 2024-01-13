import * as PIXI from "pixi.js";
import { App } from "../system/App";


// TODO: Create Empty world with: 25x100, 75x20, 100x100

// TODO: Player can create a world e.g. 20x500
// TODO: Player can load a world that already exists

const TILE_TYPES = {
  0: {
    opacity: 1,
    texture: '/assets/tiles/empty.png',
  },
  1: {
    opacity: 0.5,
    texture: 'assets/tiles/wall.png',
  }
}

type TileKeyType = keyof typeof TILE_TYPES;

interface IWorldLayout {
  layers: TileKeyType[][];
}

interface IWorld {
  id: number;
  ownedBy: number;
  title: string;
  layers: IWorldLayout['layers'];
  createdAt: number;
  updatedAt: number;
}

const DATA_WORLDS:IWorld[] = [
  {
    id: 0,
    ownedBy: 0,
    title: "First ever world",
    layers: [
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ],
      [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      ],
    ],
    createdAt: 239823293,
    updatedAt: 239923234,
  }
]














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

function generateArray(rows = 20, cols = 10) {
  const map = {
    height: cols,
    width: rows,
    layers: []
  }

  const background = Array.from({ length: rows * cols}).fill(0);
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


function compileMapForRender(mapData) {

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
export class World {
  private worldContainer: PIXI.Container;
  private map: [];

  constructor() {
    this.map = createEmptyMap;

    this.worldContainer = this.createWorld();
  }

  // make map width dynamic from world creation
 // ... (previous code)

// ... (previous code)

// ... (previous code)

// ... (previous code)

// ... (previous code)

private createWorld(mapWidth = 10) {
  const tileWidth = 16;
  const tileHeight = 16;
  const container = new PIXI.Container();
  let cellIndex = 0;

  const createMouseOverHandler = (sprite, cellIndex, layerIndex) => () => {
    console.log(`Hovered over tile at index ${cellIndex} in layer ${layerIndex}`);
    console.log("sprite", sprite)

    sprite.borderWidth = 2;
    sprite.borderColor = 0xADD8E6; 

    const borderGraphics = new PIXI.Graphics();
    borderGraphics.lineStyle(sprite.borderWidth, sprite.borderColor);
    borderGraphics.drawRect(0, 0, sprite.width, sprite.height);
    sprite.addChild(borderGraphics);
  };

  const createMouseOutHandler = (sprite) => () => {
    // Remove the border effect by clearing the sprite's children
    sprite.removeChildren();
  };

  while (cellIndex < this.map.length) {
    const tileStack = this.map[cellIndex];
    
    const cellX = cellIndex % mapWidth;
    const cellY = Math.floor(cellIndex / mapWidth);
    
    const x = cellX * tileWidth;
    const y = cellY * tileHeight;

    if (tileStack) {
      tileStack.forEach((tile, layerIndex) => {
        console.log("layerIndex", layerIndex)

        if (tile?.texture) {
          const texture = PIXI.Texture.from(tile.texture);
          const sprite = new PIXI.Sprite(texture);

          sprite.position.set(x, y);
          container.addChild(sprite);

          sprite.interactive = true;
          sprite.buttonMode = true;
          sprite.on('mouseover', createMouseOverHandler(sprite, cellIndex, layerIndex));
          sprite.on('mouseout', createMouseOutHandler(sprite));
        }
      });
    }

    cellIndex += 1;
  }

  return container;
}

// ... (remaining code)


// ... (remaining code)

// ... (remaining code)


// ... (remaining code)


// ... (remaining code)


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