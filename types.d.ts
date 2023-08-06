export type Position = { x: number; y: number };

export interface GameObject {
  camera: Position;
  mouseDown: boolean;
  mousePosition: Position;
}
