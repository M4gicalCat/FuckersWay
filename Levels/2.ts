import { Level, mapParser } from './index.js';

export const level: Level = mapParser({
  w: 11,
  h: 11,
  spawn: { x: 5, y: 5 },
  holes: [
    {
      x: 0,
      y: 0,
      w: 11,
      h: 1,
    },
    {
      x: 0,
      y: 10,
      w: 11,
      h: 1,
    },
  ],
  walls: [
    {
      x: 4,
      y: 4,
      w: 3,
      h: 1,
    },
    {
      x: 6,
      y: 5,
      w: 1,
      h: 1,
    },
    {
      x: 2,
      y: 6,
      w: 5,
      h: 1,
    },
    {
      x: 2,
      y: 2,
      w: 1,
      h: 4,
    },
    {
      x: 3,
      y: 2,
      w: 6,
      h: 1,
    },
    {
      x: 8,
      y: 3,
      w: 1,
      h: 6,
    },
    {
      x: 0,
      y: 8,
      w: 8,
      h: 1,
    },
    {
      x: 0,
      y: 1,
      w: 1,
      h: 7,
    },
  ],
  goal: { x: 0, y: 9 },
  name: 'Level 2',
});
