import { readLines } from "https://deno.land/std@0.167.0/io/mod.ts";

type Point = [number, number];
const points = new Map<string, number>();

for await (const line of readLines(Deno.stdin)) {
  const bits = line.split(' ');
  const a: Point = bits[0].split(',').map(x => parseInt(x, 10)) as Point;
  const b: Point = bits[2].split(',').map(x => parseInt(x, 10)) as Point;
  if (a[0] === b[0]) {
    for (let y = Math.min(a[1], b[1]); y <= Math.max(a[1], b[1]); y++) {
      const sp = `${a[0]},${y}`;
      points.set(sp, (points.get(sp) ?? 0) + 1);
    }
  } else if (a[1] === b[1]) {
    for (let x = Math.min(a[0], b[0]); x <= Math.max(a[0], b[0]); x++) {
      const sp = `${x},${a[1]}`;
      points.set(sp, (points.get(sp) ?? 0) + 1);
    }
  }
}

console.log(Array.from(points.values()).filter(x => x > 1).length);