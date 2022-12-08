import { getInput } from '../utils/getInput';

async function solution() {
    const input = await getInput();

    let files: Record<string, number> = {};
    let folders = new Set<string>();
    let currentFolder: string[] = [];

    input.forEach((line) => {
        if (line.startsWith('$')) {
            if (line.startsWith('$ cd')) {
                const target = line.slice(5);
                if (target === '..') {
                    currentFolder.pop();
                } else {
                    if (target !== '/') currentFolder.push(target);
                }
            }
        } else {
            const [size, name] = line.split(' ');
            if (size === 'dir') return;
            files[`${currentFolder.join('/')}${name}`] = Number(size);
        }
        folders.add(currentFolder.join('/'));
    });

    let totalSize = 0;
    let folderSizes: Record<string, number> = {};
    folders.forEach((folder) => {
        let folderSize = 0;
        Object.entries(files).forEach(([name, size]) => {
            if (name.startsWith(folder)) {
                folderSize += size;
            }
        });
        if (folderSize <= 100_000) totalSize += folderSize;
        folderSizes[folder] = folderSize;
    });

    const toDelete = Object.values(folderSizes).filter((v) => 70_000_000 - folderSizes[''] + v >= 30_000_000);

    console.log('part 1 solution:', totalSize);
    console.log('part 2 solution:', Math.min(...toDelete));
}

solution();