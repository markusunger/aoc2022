import { getInput } from '../utils/getInput';

function isAllUnique(buffer: string[]) {
    return buffer.every((item, index) => buffer.indexOf(item) === index);
}

async function solution(part2 = false) {
    const [input] = await getInput();
    const { length } = input;
    const target = part2 ? 14 : 4;
    let buffer = [];
    let count = 0;

    while(buffer.length < target || !isAllUnique(buffer)) {
        buffer.push(input[count]);
        if (buffer.length > target) buffer.shift();
        count += 1;
    }

    console.log(`part ${part2 ? '2' : '1'} solution:`, count);
}

solution().then(() => solution(true));
