import { getInput } from '../utils/getInput';

function getPriority(item: string): number {
    const charCode = item.charCodeAt(0);
    if (charCode >= 97 && charCode <= 122) {
        return charCode - 96;
    }
    return charCode - 38;
}

async function solution() {
    const input = await getInput();
    
    const priorities = input.map((line) => {
        const items = line.split('');
        const c1 = items.slice(0, items.length / 2);
        const c2 = items.slice(items.length / 2);

        const [intersection] = c1.filter((item) => c2.includes(item));
        return getPriority(intersection);
    });

    console.log('part 1 solution:', priorities.reduce((a, b) => a + b));

    const elfGroups = input.reduce((acc, curr, i) => {
        const ch = Math.floor(i / 3); 
        acc[ch] = ([] as string[]).concat((acc[ch] || []), curr); 
        return acc
     }, [] as string[][]);

    const badgePriorities = elfGroups.map((group) => {
        const [intersection] = group
            .map((line) => line.split(''))
            .reduce((a, b) => a.filter(c => b.includes(c)));
        return getPriority(intersection);
    });

    console.log('part 2 solution:', badgePriorities.reduce((a, b) => a + b));
}

solution();