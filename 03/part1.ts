import { readLines } from "https://deno.land/std@0.167.0/io/mod.ts";

const count: number[] = [];
let total = 0;

for await (const line of readLines(Deno.stdin)) {
  const bits = line.split('').map(b => b.charCodeAt(0) - 48);
  bits.forEach((b, i) => count[i] = (count[i] ?? 0) + b);
  total++;
}
const half = total / 2;
const gamma = count.map(s => s > half ? '1' : '0').join('');
const epsilon = count.map(s => s < half ? '1' : '0').join('');

console.log(parseInt(gamma, 2) * parseInt(epsilon, 2));
