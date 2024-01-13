import TILE_TYPS from "../constants/TileTypes";

export interface ITileType {
  opacity?: number;
  texture: string;
}

export type ITileKeyType = keyof typeof TILE_TYPS;


