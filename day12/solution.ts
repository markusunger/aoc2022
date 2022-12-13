import { getInput } from '../utils/getInput';

async function solution(part2 = false) {
    const input = await getInput();
    const starts = [[0, 0]];
    let end = [0, 0];
    const heightMap = input.reduce((acc, val, row) => {
        const cols = val.split('').map((char, col) => {
            if (char === 'S' || (part2 && char === 'a')) {
                starts.push([row, col]);
                return 1;
            }
            if (char === 'E') {
                end = [row, col];
                return 26;
            }
            return char.charCodeAt(0) - 96;
        });
        acc[row] = cols;
        return acc;
    }, [] as number[][]);

    const result = starts.reduce((acc, val) => {
        type QueueItem = { coord: number[]; steps: number };
        const queue: QueueItem[] = [{ coord: val, steps: 0 }];
        const visited = new Set<string>();

        while (queue.length) {
            const {
                coord: [row, col],
                steps,
            } = queue.shift() as QueueItem;
            if (row === end[0] && col === end[1]) {
                return steps < acc ? steps : acc;
            }
            [
                [0, 1],
                [0, -1],
                [1, 0],
                [-1, 0],
            ].forEach(([dRow, dCol]) => {
                const [newRow, newCol] = [row + dRow, col + dCol];
                if (!heightMap[newRow] || !heightMap[newRow][newCol]) {
                    return;
                }
                const elevOld = heightMap[row][col];
                const elevNew = heightMap[newRow][newCol];
                if (elevNew - elevOld > 1) {
                    return;
                }
                if (visited.has(`${newRow},${newCol}`)) {
                    return;
                }

                visited.add(`${newRow},${newCol}`);
                queue.push({ coord: [newRow, newCol], steps: steps + 1 });
            });
        }

        return acc;
    }, Infinity);

    console.log(`part ${part2 ? '2' : '1'} solution:`, result);
}

solution().then(() => solution(true));
