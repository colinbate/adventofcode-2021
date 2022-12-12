import { readLines } from "https://deno.land/std@0.167.0/io/mod.ts";

const EAST = '>';
const SOUTH = 'v';
const EMPTY = '.';
const seaFloor: string[][] = [];
type Point = [number, number];

for await (const line of readLines(Deno.stdin)) {
  const row = line.split('');
  seaFloor.push(row);
}

function findMoves(dir: typeof SOUTH | typeof EAST) {
  const moves: Point[] = [];
  for (let y = 0; y < seaFloor.length; y += 1) {
    for (let x = 0; x < seaFloor[y].length; x += 1) {
      if (seaFloor[y][x] === dir) {
        if (dir === EAST && seaFloor[y][(x+1)%seaFloor[y].length] === EMPTY) {
          moves.push([x,y]);
        } else if (dir === SOUTH && seaFloor[(y+1)%seaFloor.length][x] === EMPTY) {
          moves.push([x,y]);
        }
      }
    }
  }
  return moves;
}

function makeMoves(list: Point[], dir: typeof SOUTH | typeof EAST) {
  for (let m = 0; m < list.length; m += 1) {
    const from = list[m];
    if (dir === EAST) {
      seaFloor[from[1]][(from[0]+1)%seaFloor[from[1]].length] = dir;
    } else if (dir === SOUTH) {
      seaFloor[(from[1]+1)%seaFloor.length][from[0]] = dir;
    }
    seaFloor[from[1]][from[0]] = EMPTY;
  }
}

function step() {
  const eastMoves = findMoves(EAST);
  makeMoves(eastMoves, EAST);
  const southMoves = findMoves(SOUTH);
  makeMoves(southMoves, SOUTH);
  return eastMoves.length + southMoves.length;
}

let movement = true;
let steps = 0;
do {
  movement = step() > 0;
  steps++;
} while (movement);

console.log(steps);
