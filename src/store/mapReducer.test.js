import {ENEMY_TILE} from "../configs/settings";

const {DIMENSIONS} = require("../mapgen/mapgen-settings");
const {getRandomMobSpawn} = require("./mapReducer");
const {createMap} = require("../mapgen/map-generator");

test('getRandomMobSpawn test', () => {
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