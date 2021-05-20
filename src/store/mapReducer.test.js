import { ENEMY_TILE, SCREEN_HEIGHT,SCREEN_WIDTH, WALL_TILE } from "../configs/settings";

const { DIMENSIONS } = require("../mapgen/mapgen-settings");
const { getRandomMobSpawn, checkCollision } = require("./mapReducer");
const { createMap } = require("../mapgen/map-generator");

test('getRandomMobSpawn', () => {
    const mapWithMob = getRandomMobSpawn(createMap());
    let isCreated = false;
    for(let i = 0; i < DIMENSIONS; i++)
        for(let j = 0; j < DIMENSIONS; j++)
            if(mapWithMob[i][j] === ENEMY_TILE) {
                isCreated = true;
                break;
            }
    expect(isCreated).toBe(true);
})

// test
test('checkCollision test', () => {
    let playerPos = {
        x: -1,
        y: 0
    };
    expect(checkCollision(createMap(), playerPos)).toBe(true);
    
    playerPos = {
        x: 0,
        y: -1
    };
    expect(checkCollision(createMap(), playerPos)).toBe(true);

    playerPos = {
        x: DIMENSIONS,
        y: 0
    };
    expect(checkCollision(createMap(), playerPos)).toBe(true);

    playerPos = {
        x: DIMENSIONS,
        y: 0
    };
    expect(checkCollision(createMap(), playerPos)).toBe(true);

    playerPos = {
        x: 0,
        y: 0
    };
    const map = createMap();
    map[0][0] = WALL_TILE;
    const collisionResult = checkCollision(map, playerPos);
    expect(collisionResult).toBe(true);

});

test('playerFinder', () => {
    let x = 0;
    let y = 0;
    for (let row = 0; row < workingField.length; row++) {
        for (let column = 0; column < workingField[row].length; column++) {
            if (workingField[row][column] === PLAYER_TILE) {
                x = row;
                y = column;
         
})