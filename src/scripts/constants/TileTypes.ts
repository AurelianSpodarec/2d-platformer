import { ITileType } from "../interface/ITile";

const TILE_TYPES: { [key: number]: ITileType } = {
  0: {
    opacity: 1,
    texture: '/assets/tiles/empty.png',
  },
  1: {
    opacity: 0.5,
    texture: 'assets/tiles/wall.png',
  },
};

export default TILE_TYPES;
