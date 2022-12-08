import { getInput } from '../utils/getInput';

async function solution() {
    let input = (await getInput()).map((line) => line.split('').map(Number));
    const visibilityGrid = Array(input.length)
      .fill(false)
      .map(() => Array(input[0].length).fill(false));

    const isVisible = (x: number, y: number) => {
      if (x === 0 || y === 0 || x === input.length - 1 || y === input[0].length - 1) {
        return true;
      }

      const fromLeft = input[x].slice(0, y).every((val) => val < input[x][y]);
      const fromRight = input[x].slice(y + 1).every((val) => val < input[x][y]);
      const fromTop = input.slice(0, x).every((row) => row[y] < input[x][y]);
      const fromBottom = input.slice(x + 1).every((row) => row[y] < input[x][y]);

      return fromLeft || fromRight || fromTop || fromBottom;
    };

    const getScenicScore = (x: number, y: number) => {
      if (x === 0 || y === 0 || x === input.length - 1 || y === input[0].length - 1) {
        return 0;
      }

      let left = 0;
      let right = 0;
      let top = 0;
      let bottom = 0;

      for (let i = y - 1; i >= 0; i -= 1) {
        if (input[x][i] < input[x][y]) {
          left += 1;
        } else {
          left += 1;
          break;
        }
      }

      for (let i = y + 1; i < input[x].length; i += 1) {
        if (input[x][i] < input[x][y]) {
          right += 1;
        } else {
          right += 1;
          break;
        }
      }

      for (let i = x - 1; i >= 0; i -= 1) {
        if (input[i][y] < input[x][y]) {
          top += 1;
        } else {
          top += 1;
          break;
        }
      }

      for (let i = x + 1; i < input.length; i += 1) {
        if (input[i][y] < input[x][y]) {
          bottom += 1;
        } else {
          bottom += 1;
          break;
        }
      }

      return left * right * top * bottom;
    };

    let maxScenicScore = 0;
    
    for (let i = 0; i < input.length; i++) {
      for (let j = 0; j < input[i].length; j++) {
          if (isVisible(i, j)) {
              visibilityGrid[i][j] = true;
          }
          const scenicScore = getScenicScore(i, j);
          if (scenicScore > maxScenicScore) {
              maxScenicScore = scenicScore;
          } 
      }
    }

    const visibleTotal = visibilityGrid.flatMap((row) => row).filter(Boolean).length;
    console.log('part 1 solution:', visibleTotal);
    console.log('part 2 solution:', maxScenicScore);
}

solution();