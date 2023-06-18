import { Level } from './Levels';

const drawGrid = (ctx: CanvasRenderingContext2D, level: Level) => {
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 1;

  for (let x = 0; x <= level.w * 50; x += 50) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, level.h * 50);
    ctx.stroke();
  }

  for (let y = 0; y <= level.h * 50; y += 50) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(level.w * 50, y);
    ctx.stroke();
  }
};

const drawHoles = (ctx: CanvasRenderingContext2D, level: Level) => {
  ctx.fillStyle = 'red';
  for (let x in level.holes) {
    for (let y in level.holes[x]) {
      ctx.fillRect(+x * 50, +y * 50, 50, 50);
    }
  }
};

const drawWalls = (ctx: CanvasRenderingContext2D, level: Level) => {
  ctx.fillStyle = 'black';
  for (let x in level.walls) {
    for (let y in level.walls[x]) {
      ctx.fillRect(+x * 50, +y * 50, 50, 50);
    }
  }
};

const drawPlayer = (
  ctx: CanvasRenderingContext2D,
  player: { x: number; y: number },
) => {
  ctx.fillStyle = 'blue';
  ctx.fillRect(player.x * 50, player.y * 50, 50, 50);
};

const drawGoal = (ctx: CanvasRenderingContext2D, level: Level) => {
  ctx.fillStyle = 'yellow';
  ctx.fillRect(level.goal.x * 50, level.goal.y * 50, 50, 50);
};

export const draw = (
  ctx: CanvasRenderingContext2D,
  level: Level,
  params: { player: { x: number; y: number } },
) => {
  ctx.canvas.height = ctx.canvas.getBoundingClientRect().height;
  ctx.canvas.width = ctx.canvas.getBoundingClientRect().width;
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  drawGrid(ctx, level);
  drawHoles(ctx, level);
  drawWalls(ctx, level);
  drawGoal(ctx, level);
  drawPlayer(ctx, params.player);
};
