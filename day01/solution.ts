import { getInput } from "../utils/getInput";

async function solution() {
    const input = await getInput();
    
    // part 1 solution
    let calorieTotals: number[] = [];
    let currentElf = 0;

    input.forEach((calorie) => {
        if (!calorie) return currentElf += 1;
        calorieTotals[currentElf] = (calorieTotals[currentElf] || 0) + parseInt(calorie, 10);
    });

    console.log('part 1 solution:', Math.max(...calorieTotals));

    const topThree = calorieTotals.sort((a, b) => b - a).slice(0, 3);
    console.log('part 2 solution:', topThree.reduce((a, b) => a + b, 0));
}

solution();