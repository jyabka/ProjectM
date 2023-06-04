import { WALL_TILE } from '../configs/settings';
import { DIMENSIONS, MAX_LENGTH, MAX_TUNNELS } from '../configs/settings';

//creating field with parameters from config/settings.js
export function createGrid(num, dimensions) {
  let grid = [];
  for (let y = 0; y < dimensions; y++) {
    grid.push([]);
    for (let x = 0; x < dimensions; x++) {
      grid[y].push(num);
    }
  }
  return grid;
}

export function createMap(
  dimensions = DIMENSIONS,
  maxTunnels = MAX_TUNNELS,
  maxLength = MAX_LENGTH
)
{
  let map = createGrid(WALL_TILE, dimensions),
    currentRow = Math.floor(Math.random() * dimensions),
    currentColumn = Math.floor(Math.random() * dimensions),
    directions = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1]
    ],
    lastDirection = [],
    randomDirection;

  while (maxTunnels && dimensions && maxLength) {
    //choosing directions to generate
    do {
      randomDirection = directions[Math.floor(Math.random() * directions.length)];
    } while (
      (randomDirection[0] === -lastDirection[0] &&
        randomDirection[1] === -lastDirection[1]) ||
      (randomDirection[0] === lastDirection[0] && randomDirection[1] === lastDirection[1])
      );

    let randomLength = Math.ceil(Math.random() * maxLength),
      tunnelLength = 0;

    //cycle generating passes
    while (tunnelLength < randomLength) {

      if (
        (currentRow === 0 && randomDirection[0] === -1) ||
        (currentColumn === 0 && randomDirection[1] === -1) ||
        (currentRow === dimensions - 1 && randomDirection[0] === 1) ||
        (currentColumn === dimensions - 1 && randomDirection[1] === 1)
      ) {
        break;
      } else {
        map[currentRow][currentColumn] = 0;
        currentRow += randomDirection[0];
        currentColumn += randomDirection[1];
        tunnelLength++;
      }
    }
    //stopper of generator
    //stops tunnel generation when it reaches the maximum length value
    if (tunnelLength) {
      lastDirection = randomDirection;
      maxTunnels--;
    }
  }
  return map;
}
