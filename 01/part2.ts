import { readLines } from "https://deno.land/std@0.167.0/io/mod.ts";

let inc = 0;
let last: number | undefined;
const window: number[] = [];
for await (const line of readLines(Deno.stdin)) {
  const depth = parseInt(line, 10);
  window.push(depth);
  if (window.length > 3) {
    window.shift();
  }
  if (window.length === 3) {
    const sum = window[0] + window[1] + window[2];
    if (last != null && sum > last) {
      inc++;
    }
    last = sum;
  }
}

console.log(inc);