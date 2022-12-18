/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs/promises';
import { zip } from 'lodash';

type ListItem = number | number[];

function areListsInOrder(leftList: ListItem[], rightList: ListItem[]): boolean | null {
    const zipped = zip(leftList, rightList);

    for (const [left, right] of zipped) {
        if (left === undefined) return true;
        if (right === undefined) return false;

        if (Array.isArray(left) && Array.isArray(right)) {
            const r = areListsInOrder(left, right);
            if (r === null) continue;
            return r;
        }

        if (Array.isArray(left) !== Array.isArray(right)) {
            const r = areListsInOrder(
                Array.isArray(left) ? left : [left],
                Array.isArray(right) ? right : [right],
            );
            if (r === null) continue;
            return r;
        }

        if (Number.isInteger(left) && Number.isInteger(right)) {
            if (left === right) continue;
            return left < right;
        }
    }

    return null;
}

async function solution() {
    const dividerPackets = [[[2]], [[6]]];
    const packetPairs = (await fs.readFile('input', 'utf-8'))
        .split('\n\n')
        .map((pair) => pair.split('\n').map((line) => eval(line)));

    const part1 = packetPairs.reduce((acc, val, idx) => {
        const r = areListsInOrder(val[0], val[1]);
        return r ? acc + idx + 1 : acc;
    }, 0);
    console.log('part 1 solution:', part1);

    const part2 = [...packetPairs.flatMap((pair) => pair), ...dividerPackets]
        .sort((a, b) => {
            const r = areListsInOrder(a, b);
            return r === null ? 0 : r ? -1 : 1;
        })
        .reduce((acc, val, idx) => {
            if (dividerPackets.map((d) => JSON.stringify(d)).includes(JSON.stringify(val)))
                return acc * (idx + 1);
            return acc;
        }, 1);
    console.log('part 2 solution:', part2);
}

solution();
