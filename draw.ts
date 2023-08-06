import { Level } from './Levels/levels';
import { GameObject } from './types';

export const gameObject: GameObject = {
  camera: {
    x: 0,
    y: 0,
  },
  mouseDown: false,
  mousePosition: {
    x: 0,
    y: 0,
  },
};

export const initDragMovement = (target: HTMLCanvasElement, cb: () => void) => {
  target.onmousedown = e => {
    gameObject.mouseDown = true;
    gameObject.mousePosition.x = e.x;
    gameObject.mousePosition.y = e.y;
  };

  target.onmousemove = e => {
    if (!gameObject.mouseDown) return;
    gameObject.camera.x += gameObject.mousePosition.x - e.x;
    gameObject.camera.y += gameObject.mousePosition.y - e.y;
    gameObject.mousePosition.x = e.x;
    gameObject.mousePosition.y = e.y;
    cb();
  };

  window.onmouseup = () => {
    gameObject.mouseDown = false;
  };
};

const drawGrid = (ctx: CanvasRenderingContext2D) => {
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 1;
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;

  for (let x = -(gameObject.camera.x % 50); x <= w; x += 50) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }

  for (let y = -(gameObject.camera.y % 50); y <= h; y += 50) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }
};

const drawHoles = (ctx: CanvasRenderingContext2D, level: Level) => {
  ctx.fillStyle = 'red';
  const minX = Math.floor(gameObject.camera.x / 50);
  const minY = Math.floor(gameObject.camera.y / 50);
  const maxX = (gameObject.camera.x + ctx.canvas.width) / 50;
  const maxY = (gameObject.camera.y + ctx.canvas.height) / 50;
  // todo: if building larger levels, don't loop through all, but rather find the first item that is included in the displayed screen
  console.log('echo ayaa', { minX, minY, maxX, maxY });
  for (let x in level.holes) {
    if (+x < minX) continue;
    if (+x > maxX) break;
    for (let y in level.holes[x]) {
      if (+y < minY) continue;
      if (+y > maxY) break;
      ctx.fillRect(
        +x * 50 - gameObject.camera.x,
        +y * 50 - gameObject.camera.y,
        50,
        50,
      );
    }
  }
};

const drawWalls = (ctx: CanvasRenderingContext2D, level: Level) => {
  ctx.fillStyle = 'black';
  const minX = Math.floor(gameObject.camera.x / 50);
  const minY = Math.floor(gameObject.camera.y / 50);
  const maxX = (gameObject.camera.x + ctx.canvas.width) / 50;
  const maxY = (gameObject.camera.y + ctx.canvas.height) / 50;
  for (let x in level.walls) {
    if (+x < minX) continue;
    if (+x > maxX) break;
    for (let y in level.walls[x]) {
      if (+y < minY) continue;
      if (+y > maxY) break;
      ctx.fillRect(
        +x * 50 - gameObject.camera.x,
        +y * 50 - gameObject.camera.y,
        50,
        50,
      );
    }
  }
};

const drawPlayer = (
  ctx: CanvasRenderingContext2D,
  player: { x: number; y: number },
) => {
  ctx.fillStyle = 'blue';
  ctx.fillRect(
    player.x * 50 - gameObject.camera.x,
    player.y * 50 - gameObject.camera.y,
    50,
    50,
  );
};

const drawGoal = (ctx: CanvasRenderingContext2D, level: Level) => {
  ctx.fillStyle = 'yellow';
  ctx.fillRect(
    level.goal.x * 50 - gameObject.camera.x,
    level.goal.y * 50 - gameObject.camera.y,
    50,
    50,
  );
};

export const draw = (
  ctx: CanvasRenderingContext2D,
  level: Level,
  params: { player: { x: number; y: number } },
) => {
  ctx.canvas.height = ctx.canvas.getBoundingClientRect().height;
  ctx.canvas.width = ctx.canvas.getBoundingClientRect().width;
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  drawGrid(ctx);
  drawHoles(ctx, level);
  drawWalls(ctx, level);
  drawGoal(ctx, level);
  drawPlayer(ctx, params.player);
};
