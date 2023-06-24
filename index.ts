import { go } from './go.js';
import { draw } from './draw.js';

window.onload = async () => {
  const URLParams = new URLSearchParams(window.location.search);

  const { level } = await import(`./Levels/${URLParams.get('level') ?? 1}.js`);
  const play = document.getElementById('play') as HTMLButtonElement;
  const fuckersWay = document.getElementById('FuckersWay') as HTMLCanvasElement;
  const ctx = fuckersWay.getContext('2d') as CanvasRenderingContext2D;
  const bf = document.getElementById('brainfuck') as HTMLTextAreaElement;

  bf.value = JSON.parse(localStorage.getItem('bf') ?? '{}')?.[level.name] ?? '';

  bf.oninput = () => {
    const saved = JSON.parse(localStorage.getItem('bf') ?? '{}');
    saved[level.name] = bf.value;
    localStorage.setItem('bf', JSON.stringify(saved));
  };

  draw(ctx, level, { player: level.spawn });
  play.onclick = () => {
    play.disabled = true;
    const brainfuck = bf.value;
    go(level, ctx, brainfuck).then(() => (play.disabled = false));
  };
};
