import { Level } from './Levels';
import { parse } from './brainfuck/parser.js';
import { draw } from './draw.js';

const canMove = (x: number, y: number, level: Level) => ({
  die: level.holes[x]?.[y],
  hit: level.walls[x]?.[y],
  win: level.goal.x === x && level.goal.y === y,
});

export const go = (
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

  parse(brainfuck, (action, stop) => {
    switch (action.type) {
      case 'increment':
        if (action.value === 0) {
          const res = canMove(params.player.x + 1, params.player.y, level);
          if (!res.hit) {
            params.player.x++;
            if (res.die) stop();
            if (res.win) console.log('YOUPI');
          }
        } else if (action.value === 1) {
          const res = canMove(params.player.x, params.player.y - 1, level);
          if (!res.hit) {
            params.player.y--;
            if (res.die) stop();
            if (res.win) console.log('YOUPI');
          }
        }
        return draw(ctx, level, params);
      case 'decrement':
        if (action.value === 0) {
          const res = canMove(params.player.x - 1, params.player.y, level);
          if (!res.hit) {
            params.player.x--;
            if (res.die) stop();
            if (res.win) console.log('YOUPI');
          }
        } else if (action.value === 1) {
          const res = canMove(params.player.x, params.player.y + 1, level);
          if (!res.hit) {
            params.player.y++;
            if (res.die) stop();
            if (res.win) console.log('YOUPI');
          }
        }
        return draw(ctx, level, params);
    }
  });
};
