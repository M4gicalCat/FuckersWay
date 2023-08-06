export type Level = {
  spawn: { x: number; y: number };
  goal: { x: number; y: number };
  w: number;
  h: number;
  walls: Record<number, Record<number, boolean>>;
  holes: Record<number, Record<number, boolean>>;
  name: string;
};

export interface HumanReadableMap {
  w: number;
  h: number;
  walls: { x: number; y: number; w: number; h: number }[];
  holes: { x: number; y: number; w: number; h: number }[];
  spawn: { x: number; y: number };
  goal: { x: number; y: number };
  name: string;
}
