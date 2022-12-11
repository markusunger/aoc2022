/* eslint-disable @typescript-eslint/no-non-null-assertion */

/*
    Solution does not work for part 2 because of this brute force operation exceeding the limits even of the JS BigInt
    data type. Not sure how to solve this as I "suck at math"(TM)
*/
import { readFile } from 'fs/promises';

async function solution(rounds = 20, worryDividedBy = 3) {
    const rawInput = await readFile('input', 'utf-8');
    const monkeys = rawInput.split('\n\n').map((monkey) => {
        const lines = monkey.split('\n');
        return {
            id: Number(lines[0].match(/\d+/g)![0]),
            items: lines[1].split(': ')[1].split(', ').map(Number),
            worryOp: lines[2].split(': ')[1].replace('new', 'worry'),
            testDivideBy: Number(lines[3].match(/\d+/g)![0]),
            trueTarget: Number(lines[4].match(/\d+/g)![0]),
            falseTarget: Number(lines[5].match(/\d+/g)![0]),
            inspections: 0,
        };
    });

    for (let i = 1; i <= rounds; i += 1) {
        for (const monkey of monkeys) {
            monkey.items.forEach((item) => {
                // eslint-disable-next-line prefer-const, @typescript-eslint/no-unused-vars
                let [old, worry] = [item, 0];
                eval(monkey.worryOp);
                worry = Math.floor(worry / worryDividedBy);
                if (worry % monkey.testDivideBy === 0) {
                    monkeys.find((m) => m.id === monkey.trueTarget)!.items.push(worry);
                } else {
                    monkeys.find((m) => m.id === monkey.falseTarget)!.items.push(worry);
                }
                monkey.inspections += 1;
            });
            monkey.items = [];
        }
    }

    const [top1, top2] = monkeys
        .map((monkey) => monkey.inspections)
        .sort((a, b) => -a + b)
        .slice(0, 2);
    console.log(`part ${rounds === 20 ? '1' : '2'} solution:`, top1 * top2);
}

solution().then(() => solution(10_000, 1));
