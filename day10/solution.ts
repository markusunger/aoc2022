import { getInput } from '../utils/getInput';

async function solution() {
    const input = await getInput();

    let register = 1;
    let cycle = 0;
    let timeToRegisterChange = 0;
    let registerChange = 0;
    const signalStrengths = [];
    const display = new Array(6).fill('.').map(() => new Array(40).fill('.'));

    while (input.length > 0) {
        cycle += 1;
        if (timeToRegisterChange === 0) {
            const line = input.shift() as string;
            const delta = line.match(/-?\d+/g);

            if (!delta) {
                // noop command
                timeToRegisterChange = 1;
                registerChange = 0;
            } else {
                // addx command
                registerChange = Number(delta[0]);
                timeToRegisterChange = 2;
            }
        }

        if ([register - 1, register, register + 1].includes((cycle % 40) - 1)) {
            display[Math.floor(cycle / 40)][(cycle % 40) - 1] = '#';
        }

        if ([20, 60, 100, 140, 180, 220].includes(cycle)) {
            signalStrengths.push(cycle * register);
        }

        timeToRegisterChange -= 1;
        if (timeToRegisterChange === 0) register += registerChange;
    }

    console.log(
        'part 1 solution:',
        signalStrengths.reduce((a, b) => a + b, 0),
    );

    console.log('part 2 solution:');
    console.log(display.map((row) => row.join('')).join('\n'));
}

solution();
