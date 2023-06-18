import { Level } from './index';

export const level: Level = {
  spawn: { x: 1, y: 1 },
  goal: { x: 10, y: 1 },
  h: 3,
  walls: {
    0: {
      0: true,
      1: true,
      2: true,
    },
    1: {
      0: true,
      2: true,
    },
    2: {
      0: true,
      2: true,
    },
    3: {
      0: true,
      2: true,
    },
    4: {
      0: true,
      2: true,
    },
    5: {
      0: true,
      2: true,
    },
    6: {
      0: true,
      2: true,
    },
    7: {
      0: true,
      2: true,
    },
    8: {
      0: true,
      2: true,
    },
    9: {
      0: true,
      2: true,
    },
    10: {
      0: true,
      2: true,
    },
    11: {
      0: true,
      1: true,
      2: true,
    },
  },
  holes: {},
  w: 12,
  name: 'Tutorial',
};
