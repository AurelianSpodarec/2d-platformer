import { ITileKeyType } from "./ITile";

export interface IMapData {
  layers: ITileKeyType[][];
}

export interface IWorld {
  id: number;
  ownedBy: number;
  title: string;
  width: number;
  height: number;
  layers: IMapData['layers'];
  createdAt: number;
  updatedAt: number;
}
