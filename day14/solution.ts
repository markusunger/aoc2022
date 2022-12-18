import { has, unset } from 'lodash';
import { getInput } from '../utils/getInput';

enum Tile {
    Empty = '.',
    Wall = '#',
    Sand = 'o',
}

type Grid = Record<string, Tile>;

function getGrid(input: string[]): Grid {
    return input.reduce((acc, line) => {
        const points = line.split(' -> ');
        points.forEach((tile, index) => {
            if (index === 0) {
                acc[tile] = Tile.Wall;
            } else {
                let [fromX, fromY] = points[index - 1].split(',').map(Number);
                let [toX, toY] = tile.split(',').map(Number);

                [fromX, toX] = [fromX, toX].sort((a, b) => a - b);
                [fromY, toY] = [fromY, toY].sort((a, b) => a - b);
                const xs = Array.from({ length: toX - fromX + 1 }, (_, i) => i + fromX);
                const ys = Array.from({ length: toY - fromY + 1 }, (_, i) => i + fromY);

                xs.forEach((x) => {
                    ys.forEach((y) => {
                        acc[`${x},${y}`] = Tile.Wall;
                    });
                });
            }
        });
        return acc;
    }, {} as Record<string, Tile>);
}

async function solution(part2 = false) {
    const input = await getInput();
    const grid = getGrid(input);

    const maxY = Math.max(...Object.keys(grid).map((key) => Number(key.split(',')[1])));

    if (part2) {
        for (let i = -1000; i <= 1000; i += 1) {
            grid[`${i},${maxY + 2}`] = Tile.Wall;
        }
    }
    let hasCompleted = false;
    let sandCount = 0;
    let sandAt = `500,0`;
    let isStuck = false;

    while (!hasCompleted) {
        sandCount += 1;
        sandAt = `500,0`;
        grid[sandAt] = Tile.Sand;
        isStuck = false;

        while (!isStuck) {
            const [x, y] = sandAt.split(',').map(Number);
            const below = `${x},${y + 1}`;
            const left = `${x - 1},${y + 1}`;
            const right = `${x + 1},${y + 1}`;

            if (!part2 && y > maxY) {
                hasCompleted = true;
                break;
            }

            if (!has(grid, below)) {
                unset(grid, sandAt);
                grid[below] = Tile.Sand;
                sandAt = below;
            } else if (!has(grid, left) || !has(grid, right)) {
                unset(grid, sandAt);
                if (!has(grid, left)) {
                    grid[left] = Tile.Sand;
                    sandAt = left;
                } else {
                    grid[right] = Tile.Sand;
                    sandAt = right;
                }
            } else {
                isStuck = true;
                if (part2 && below === '500,1') {
                    hasCompleted = true;
                }
            }
        }
    }

    console.log(`part ${part2 ? '2' : '1'} solution:`, sandCount - (part2 ? 0 : 1));
}

solution().then(() => solution(true));
