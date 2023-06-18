import { level } from './Levels/1.js';
import { go } from './go.js';
import { draw } from './draw.js';

const currentLevel = level;

window.onload = () => {
  const play = document.getElementById('play') as HTMLButtonElement;
  const fuckersWay = document.getElementById('FuckersWay') as HTMLCanvasElement;
  const ctx = fuckersWay.getContext('2d') as CanvasRenderingContext2D;
  const bf = document.getElementById('brainfuck') as HTMLTextAreaElement;

  bf.value =
    JSON.parse(localStorage.getItem('bf') ?? '{}')?.[currentLevel.name] ?? '';

  bf.oninput = () => {
    const saved = JSON.parse(localStorage.getItem('bf') ?? '{}');
    saved[currentLevel.name] = bf.value;
    localStorage.setItem('bf', JSON.stringify(saved));
  };

  draw(ctx, level, { player: level.spawn });
  play.onclick = () => {
    const brainfuck = bf.value;
    go(level, ctx, brainfuck);
  };
};
