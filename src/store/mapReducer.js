import {createMap} from "../mapgen/map-generator";
import {DIMENSIONS, MAX_LENGTH, MAX_TUNNELS} from "../mapgen/mapgen-settings";
import {PLAYER_TILE, WALL_TILE} from "../configs/settings";

const initialState = {
    map: initField()
}

function initField() {
    const map = createMap(DIMENSIONS, MAX_TUNNELS, MAX_LENGTH, WALL_TILE);
    const mapWithPlayer = getRandomPlayerSpawn(map);
    return mapWithPlayer;
}

function getRandomTile(min: DIMENSIONS, max: DIMENSIONS) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomPlayerSpawn(map) {
    const newField = copyField(map);
    let x, y;
    let isSpawned = false;
    do {
        x = getRandomTile(0, DIMENSIONS);
        y = getRandomTile(0, DIMENSIONS);
        if (newField[x][y] !== WALL_TILE) {
            isSpawned = true;
        }
    } while (!isSpawned);

    newField[x][y] = PLAYER_TILE;
    return newField;
}

function copyField(map) {
    let editedField = [...map];
    for (let x = 0; x < editedField.length; x++) {
        editedField[x] = [...editedField[x]];
    }
    return editedField;
}

const mapReducer = (state = initialState, action) => {
    return state;
}
export default mapReducer;