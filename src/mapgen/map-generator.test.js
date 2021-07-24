import { createGrid, createMap } from './map-generator';
import { WALL } from './mapgen-settings';

test('Mapgen| grid test', () => {
    const dimensions = 10;
    const num = 0;
    const grid = createGrid(num, dimensions);
    expect(grid.length).toBe(dimensions);
    expect(grid[0].length).toBe(dimensions);
    expect(grid[0][0]).toBe(num);
});

test('Mapgen| creator test', () => {
    const dimensions = 10;
    const max_tunnels = 13;
    const max_length = 6;
    let test_status = 0;
    const map = createMap(dimensions, max_tunnels, max_length);
    for (let i = 0; i < dimensions; i++)
        for (let j = 0; j < dimensions; j++)
            if (map[i][j] === WALL) {
                test_status = 1;
                break;
            }
    expect(1).toBe(test_status);
});
