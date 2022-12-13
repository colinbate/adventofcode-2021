import { readLines } from "https://deno.land/std@0.167.0/io/mod.ts";

type Point = [number, number];
type Vec = [number, number];
const points = new Map<string, number>();

function getVec(a: Point, b: Point): [Vec, number] {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  return [[dx === 0 ? 0 : dx / Math.abs(dx), dy === 0 ? 0 : dy / Math.abs(dy)], Math.max(Math.abs(dx), Math.abs(dy)) + 1];
}

for await (const line of readLines(Deno.stdin)) {
  const bits = line.split(' ');
  const a: Point = bits[0].split(',').map(x => parseInt(x, 10)) as Point;
  const b: Point = bits[2].split(',').map(x => parseInt(x, 10)) as Point;
  const [v, len] = getVec(a, b);
  let x = a[0], y = a[1];
  let i = 0;
  while (i < len) {
    const sp = `${x},${y}`;
    points.set(sp, (points.get(sp) ?? 0) + 1);
    x += v[0];
    y += v[1];
    i++;
  }
}

console.log(Array.from(points.values()).filter(x => x > 1).length);