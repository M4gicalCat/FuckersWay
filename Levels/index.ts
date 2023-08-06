import { HumanReadableMap, Level } from './levels';

export const mapParser = (map: HumanReadableMap) => {
  const built: Level = {
    spawn: { x: map.spawn.x + 1, y: map.spawn.y + 1 },
    goal: { x: map.goal.x + 1, y: map.goal.y + 1 },
    w: map.w + 2,
    h: map.h + 2,
    walls: [],
    holes: [],
    name: map.name,
  };
  const addWall = (x: number, y: number) => {
    built.walls[x + 1] ??= [];
    built.walls[x + 1][y + 1] = true;
  };
  const addHole = (x: number, y: number) => {
    built.holes[x + 1] ??= [];
    built.holes[x + 1][y + 1] = true;
  };
  for (let x = -1; x <= map.w; x++) {
    addWall(x, -1);
    addWall(x, map.h);
  }
  for (let y = 0; y < map.h; y++) {
    addWall(-1, y);
    addWall(map.w, y);
  }

  for (const wall of map.walls) {
    for (let x = wall.x; x < wall.x + wall.w; x++) {
      for (let y = wall.y; y < wall.y + wall.h; y++) {
        addWall(x, y);
      }
    }
  }

  for (const hole of map.holes) {
    for (let x = hole.x; x < hole.x + hole.w; x++) {
      for (let y = hole.y; y < hole.y + hole.h; y++) {
        addHole(x, y);
      }
    }
  }

  return built;
};
