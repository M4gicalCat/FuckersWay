import { Level, mapParser } from './index.js';

export const level: Level = mapParser({
  w: 10,
  h: 1,
  holes: [],
  walls: [],
  name: 'Tutorial',
  spawn: { x: 0, y: 0 },
  goal: { x: 9, y: 0 },
});
