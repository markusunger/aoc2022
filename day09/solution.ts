import { getInput } from '../utils/getInput';

const DIRECTIONS = {
    L: [-1, 0],
    R: [1, 0],
    U: [0, -1],
    D: [0, 1],
} as const;

type Coord = [number, number];

async function solution(part2 = false) {
    const input = await getInput();
    const grid = new Set<string>();
    const head: Coord = [0, 0];
    const tails: Coord[] = [...new Array(part2 ? 9 : 1)].map(() => [...head]);

    const moveTail = (leading: Coord, trailing: Coord) => {
        const [x, y, i, j] = [...trailing, ...leading];

        if (i === x && Math.abs(y - j) > 1) {
            if (j > y) trailing[1]++;
            else trailing[1]--;
        }

        if (j === y && Math.abs(x - i) > 1) {
            if (i > x) trailing[0]++;
            else trailing[0]--;
        }

        if (i != x && j != y && !(Math.abs(x - i) === 1 && Math.abs(y - j) === 1)) {
            if (Math.abs(y - j) === 1) {
                if (i > x) trailing[0]++;
                else trailing[0]--;
                trailing[1] = j;
            }

            if (Math.abs(x - i) === 1) {
                if (j > y) trailing[1]++;
                else trailing[1]--;
                trailing[0] = i;
            }
        }

        if (Math.abs(i - x) === 2 && Math.abs(j - y) === 2) {
            if (i > x) trailing[0]++;
            else trailing[0]--;
            if (j > y) trailing[1]++;
            else trailing[1]--;
        }
    };

    input.forEach((line) => {
        // eslint-disable-next-line prefer-const
        let [direction, number] = line.split(' ') as [keyof typeof DIRECTIONS, number];
        number = Number(number); // sneakily coercing types so it matches the assertion above 🤫

        for (let i = 0; i < number; i += 1) {
            head[0] += DIRECTIONS[direction][0];
            head[1] += DIRECTIONS[direction][1];

            tails.forEach((tail, idx) => {
                moveTail(idx === 0 ? head : tails[idx - 1], tail);
                if (!part2 || idx === 8) grid.add(tail.join(','));
            });
        }
    });

    console.log(`part ${part2 ? '2' : '1'} solution:`, grid.size);
}

solution().then(() => solution(true));
