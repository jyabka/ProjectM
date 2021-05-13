import {createMap} from "../mapgen/map-generator";
import {DIMENSIONS, MAX_LENGTH, MAX_TUNNELS} from "../mapgen/mapgen-settings";
import {DIRECTIONS, FLOOR_TILE, PLAYER_TILE, WALL_TILE} from "../configs/settings";

const initialState = {
    map: initField(),
    player: initPlayer(),
}

//work w/ player
function initPlayer() {
    return {};
}

function movePlayer(map, direction) {
    const workingField = copyField(map);
    // найти позицию игрока
    const playerPos = playerFinder(workingField);
    // вычислить следующую позицию
    const newPlayerPos = getNextPosition(playerPos, direction);
    if (!checkCollision(workingField, newPlayerPos)) {
        workingField[playerPos.x][playerPos.y] = FLOOR_TILE;
        workingField[newPlayerPos.x][newPlayerPos.y] = PLAYER_TILE;
    }
    return workingField;
}

/*
1. Копируем field
2. Находим игрока на field / PLAYER_TILE = 2
3. Прожимаем кнопку движения
4. Проверяем возможность для прохода
5. Изменяем позицию игрока
*/

function checkCollision(map, playerPos) {
    return map[playerPos.x][playerPos.y] === WALL_TILE;
}

function playerFinder(workingField) {
    let x, y;
    for (let row = 0; row < workingField.length; row++) {
        for (let column = 0; column < workingField[row].length; column++) {
            if (workingField[row][column] === PLAYER_TILE) {
                x = row;
                y = column;
                break;
            }
        }
    }

    return {x, y};
}

function getNextPosition(playerPos, direction) {
    switch (direction) {
        case DIRECTIONS.UP:
            return {x: playerPos.x - 1, y: playerPos.y}
        case DIRECTIONS.DOWN:
            return {x: playerPos.x + 1, y: playerPos.y}
        case DIRECTIONS.LEFT:
            return {x: playerPos.x, y: playerPos.y - 1}
        case DIRECTIONS.RIGHT:
            return {x: playerPos.x, y: playerPos.y + 1}
        default:
            return playerPos;
    }
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

//work w/ map
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

function copyField(map) {
    let editedField = [...map];
    for (let x = 0; x < editedField.length; x++) {
        editedField[x] = [...editedField[x]];
    }
    return editedField;
}

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'MOVE_CH':
            return {...state, map: movePlayer(state.map, action.payload)};

        default:
            return state;
    }

}
export default Reducer;