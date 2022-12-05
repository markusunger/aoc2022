import { getInput } from '../utils/getInput';

async function solution(part2 = false) {
    const input = await getInput();
    const sepIndex = input.indexOf('');
    const crateSetup = input.slice(0, sepIndex - 1);
    const instructions = input.slice(sepIndex + 1);

    // create initial stacks
    const stacks = crateSetup.reverse().reduce((acc, line): string[][] => {
        const rows = `${line} `.match(/.{4}/g) as RegExpMatchArray;
        rows.forEach((row, i) => {
            const crate = row.match(/(?<=\[).(?=\])/);
            if (crate) {
                if (!acc[i]) acc[i] = [];
                acc[i].push(crate[0]);
            }
        });
        return acc;
    }, [] as string[][]);

    // execute instructions
    instructions.forEach((instruction) => {
        const [amount, from, to] = (instruction.match(/\d+/g) as RegExpMatchArray).map(Number);

        if (!part2) {
            for (let i = 1; i <= amount; i += 1) {
                stacks[to - 1].push(stacks[from - 1].pop() as string);
            }
        } else {
            const crates = stacks[from - 1].splice(-amount);
            stacks[to - 1].push(...crates);
        }
    });

    const result = stacks.map((stack) => stack.length ? stack.pop() : '').join('');
    console.log(`part ${part2 ? '2' : '1'} solution:`, result);
}

solution().then(() =>solution(true));
