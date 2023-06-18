export type Level = {
  spawn: { x: number; y: number };
  goal: { x: number; y: number };
  w: number;
  h: number;
  walls: Record<number, Record<number, boolean>>;
  holes: Record<number, Record<number, boolean>>;
  name: string;
};
