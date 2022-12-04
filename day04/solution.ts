import { getInput } from '../utils/getInput';

type Range = [number, number];

function isRangeIntersecting(range1: Range, range2: Range) {
    return (range1[0] >= range2[0] && range1[1] <= range2[1]) ||
        (range2[0] >= range1[0] && range2[1] <= range1[1]);
}

function isRangeOverlapping(range1: Range, range2: Range) {
    return (range1[0] <= range2[0] && range1[1] >= range2[0]) ||
        (range2[0] <= range1[0] && range2[1] >= range1[0]);
}

async function solution() {
    const input = await getInput();

    const pairs = input
        .map((line) => 
            line.split(',').map((range) => 
                range.split('-').map((n) => 
                    parseInt(n, 10))));

    console.log('part 1 solution:', pairs.filter(([range1, range2]) =>
        isRangeIntersecting(range1 as Range, range2 as Range)).length);
    console.log('part 2 solution:', pairs.filter(([range1, range2]) =>
        isRangeOverlapping(range1 as Range, range2 as Range)).length);
}

solution();

