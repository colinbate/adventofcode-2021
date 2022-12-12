import { readLines } from "https://deno.land/std@0.167.0/io/mod.ts";

type Oper = 'inp' | 'add' | 'mul' | 'div' | 'mod' | 'eql';
type Instruction = {
  op: Oper;
  reg: string;
  val: string | number;
}

class ALU {
  private reg: Record<string,number>;
  private input: number[] = [];

  constructor(private program: Instruction[]) {
    this.reg = {
      w: 0,
      x: 0,
      y: 0,
      z: 0,
    };
  }

  print() {
    console.log(`w: ${this.reg.w} x: ${this.reg.x} y: ${this.reg.y} z: ${this.reg.z}`);
  }

  isValid() {
    return this.reg.z === 0;
  }

  run(input: number[]) {
    this.input = input;
    let inps = 0;
    for (const inst of this.program) {
      this[inst.op].apply(this, [inst.reg, inst.val]);
      console.log(`${inst.op} ${inst.reg} ${inst.val} ${inst.op === 'inp' ? String.fromCharCode(65+(inps++)) : ''}`);
      this.print();
    }
  }

  inp(a: string, _b: unknown) {
    if (this.input.length === 0) {
      throw 'Not enough input';
    }
    this.reg[a] = this.input.shift() ?? 0;
  }

  add(a: string, b: string | number) {
    const val = typeof b === 'string' ? this.reg[b] : b;
    this.reg[a] = this.reg[a] + val;
  }

  mul(a: string, b: string | number) {
    const val = typeof b === 'string' ? this.reg[b] : b;
    this.reg[a] = this.reg[a] * val;
  }

  div(a: string, b: string | number) {
    const val = typeof b === 'string' ? this.reg[b] : b;
    this.reg[a] = Math.trunc(this.reg[a] / val);
  }

  mod(a: string, b: string | number) {
    const val = typeof b === 'string' ? this.reg[b] : b;
    this.reg[a] = this.reg[a] % val;
  }

  eql(a: string, b: string | number) {
    const val = typeof b === 'string' ? this.reg[b] : b;
    this.reg[a] = this.reg[a] === val ? 1 : 0;
  }
}

const prog: Instruction[] = [];
for await (const line of readLines(Deno.stdin)) {
  const [op, reg, x] = line.split(' ');
  const val = x && x !== 'w' && x !== 'x' && x !== 'y' && x !== 'z' ? parseInt(x, 10) : x;
  prog.push({op: op as Oper, reg, val});
}

const monad = new ALU(prog);

const input = [3, 1, 5, 2, 1, 1, 1, 9, 1, 5, 1, 4, 2, 1];
//             A  B  C  D  E  F  G  H  I  J  K  L  M  N
console.log(input.map(x => x.toString()).join(''));
monad.run(input);
console.log(monad.isValid());
