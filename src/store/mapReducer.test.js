import { ENEMY_TILE, SCREEN_HEIGHT,SCREEN_WIDTH, WALL_TILE } from "../configs/settings";
import {initField, playerFinder,mobFinder} from "./gameReducer";

const { DIMENSIONS } = require("../mapgen/mapgen-settings");
const { getRandomMobSpawn, checkWallCollision, checkMobCollision } = require("./gameReducer");
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
    expect(checkWallCollision(createMap(), playerPos)).toBe(true);
    
    playerPos = {
        x: 0,
        y: -1
    };
    expect(checkWallCollision(createMap(), playerPos)).toBe(true);

    playerPos = {
        x: DIMENSIONS,
        y: 0
    };
    expect(checkWallCollision(createMap(), playerPos)).toBe(true);

    playerPos = {
        x: DIMENSIONS,
        y: 0
    };
    expect(checkWallCollision(createMap(), playerPos)).toBe(true);

    playerPos = {
        x: 0,
        y: 0
    };
    const map = createMap();
    map[0][0] = WALL_TILE;
    const collisionResult = checkWallCollision(map, playerPos);
    expect(collisionResult).toBe(true);

});

test('playerFinder', () => {
    const coords = playerFinder(initField());
    expect(coords.x).toBeTruthy();
    expect(coords.y).toBeTruthy();
});

test('mobFinder', () => {
    const coords = mobFinder(initField());
    expect(coords.x).toBeTruthy();
    expect(coords.y).toBeTruthy();
    
});

// test
test('test checkCollisionMobs ', () =>{
    const map = createMap();
    map[2][3] = ENEMY_TILE;
    expect(checkMobCollision(map, {x:2, y:2})).toBeFalsy();
    expect(checkMobCollision(map, {x:2, y:3})).toBeTruthy();
})