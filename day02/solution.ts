import { getInput } from '../utils/getInput';

const shapes = {
    'X': { wins: 'C', draws: 'A', loses: 'B', score: 1 },
    'Y': { wins: 'A', draws: 'B', loses: 'C', score: 2 },
    'Z': { wins: 'B', draws: 'C', loses: 'A', score: 3 },
 } as const;

async function solution() {
    const input = await getInput();

    const expectedScores = input.map((line) => {
        const [elf, self] = line.split(' ') as [string, keyof typeof shapes];
        const shapeScore = shapes[self].score;
        const outcomeScore =
            shapes[self].wins === elf ? 6 :
                shapes[self].draws === elf ? 3 : 0;

        return shapeScore + outcomeScore;
    });

    console.log('part 1 solution:', expectedScores.reduce((a, b) => a + b));

    const guideScores = input.map((line) => {
        const [elf, outcome] = line.split(' ') as [string, keyof typeof shapes];
        let outcomeScore = 0;
        const shapeToPlay = Object.entries(shapes).find(([shape, data]) => {
            if (outcome === 'X') return data.loses === elf;
            if (outcome === 'Y') {
                outcomeScore = 3;
                return data.draws === elf;
            }
            if (outcome === 'Z') {
                outcomeScore = 6;
                return data.wins === elf;
            }
        });

        return shapeToPlay![1].score + outcomeScore;
    });

    console.log('part 2 solution:', guideScores.reduce((a, b) => a + b));
}

solution();