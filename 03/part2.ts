import { readLines } from "https://deno.land/std@0.167.0/io/mod.ts";

const report: string[] = [];
let total = 0;

for await (const line of readLines(Deno.stdin)) {
  report.push(line);
  total++;
}
const half = total / 2;
let o2: string[] = report;
let co2: string[] = report;

function bifurcate(list: string[], pos: number) {
  return list.reduce((p, c) => {
    const bit = c.at(pos) ?? '1';
    p[bit].push(c);
    return p;
  }, {'0': [], '1': []} as Record<string, string[]>);
}

for (let b = 0; b < report[0].length; b += 1) {
  let opts: Record<string, string[]> = {};
  if (o2.length > 1) {
    opts = bifurcate(o2, b);
    o2 = opts['1'].length >= opts['0'].length ? opts['1'] : opts['0'];
  }
  if (co2.length > 1) {
    opts = bifurcate(co2, b);
    co2 = opts['1'].length >= opts['0'].length ? opts['0'] : opts['1'];
  }
}

console.log(parseInt(o2[0], 2) * parseInt(co2[0], 2));
