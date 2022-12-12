import { readLines } from "https://deno.land/std@0.167.0/io/mod.ts";

let inc = 0;
let last: number | undefined;
for await (const line of readLines(Deno.stdin)) {
  const depth = parseInt(line, 10);
  if (last != null && depth > last) {
    inc++;
  }
  last = depth;
}

console.log(inc);