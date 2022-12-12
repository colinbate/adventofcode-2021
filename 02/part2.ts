import { readLines } from "https://deno.land/std@0.167.0/io/mod.ts";

let pos = 0;
let depth = 0;
let aim = 0;
for await (const line of readLines(Deno.stdin)) {
  const [command, amount] = line.split(' ');
  const value = parseInt(amount, 10);
  if (command === 'forward') {
    pos += value;
    depth += value * aim;
  } else if (command === 'down') {
    aim += value;
  } else {
    aim -= value;
  }
}

console.log(pos * depth);