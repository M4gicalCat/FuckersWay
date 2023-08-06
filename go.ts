import { parse } from './brainfuck/parser.js';
import { draw, gameObject, initDragMovement } from './draw.js';
import { Level } from './Levels/levels';

const canMove = (
  x: number,
  y: number,
  level: Level,
  action: () => void,
  stop: () => void,
) => {
  const res = {
    die: level.holes[x]?.[y],
    hit: level.walls[x]?.[y],
    win: level.goal.x === x && level.goal.y === y,
  };
  if (!res.hit) {
    action();
    if (res.die) stop();
    if (res.win) {
      stop();
      console.log('YOUPI');
    }
  }
};

export const go = async (
  level: Level,
  ctx: CanvasRenderingContext2D,
  brainfuck: string,
) => {
  const params = {
    player: {
      x: level.spawn.x,
      y: level.spawn.y,
    },
  };
  initDragMovement(ctx.canvas, () => draw(ctx, level, params));
  await parse(brainfuck, (action, stop) => {
    switch (action.type) {
      case 'increment':
        if (action.value === 0) {
          canMove(
            params.player.x + 1,
            params.player.y,
            level,
            () => params.player.x++,
            stop,
          );
        } else if (action.value === 1) {
          canMove(
            params.player.x,
            params.player.y - 1,
            level,
            () => params.player.y--,
            stop,
          );
        }
        return draw(ctx, level, params);
      case 'decrement':
        if (action.value === 0) {
          canMove(
            params.player.x - 1,
            params.player.y,
            level,
            () => params.player.x--,
            stop,
          );
        } else if (action.value === 1) {
          canMove(
            params.player.x,
            params.player.y + 1,
            level,
            () => params.player.y++,
            stop,
          );
        }
        return draw(ctx, level, params);
    }
  });
};
