// import nanoid from 'nanoid';
import {nanoid} from 'nanoid';
import {createMap} from "../mapgen/map-generator";
import {DIMENSIONS, MAX_LENGTH, MAX_TUNNELS} from "../mapgen/mapgen-settings";
import {DIRECTIONS, ENEMY_TILE, FLOOR_TILE, PLAYER_TILE, WALL_TILE, MOB_SPEED} from "../configs/settings";
import {MOVE_CH, START_FIGHT} from "./action-types";

const mobs = initMobs();

const initialState = {
    map: initField(),
    player: initPlayer(),
    mobs,
}
//work w/ player
function initPlayer() {
    return {
        health: 20,
        dmg: 4,
        isFighting: false,
        fightingWith: null
    };
}

// updateMap??
function movePlayer(map, direction) {
    const workingField = copyField(map);
    // найти позицию игрока
    const playerPos = playerFinder(workingField);
    // вычислить следующую позицию
    const newPlayerPos = getNextPosition(playerPos, direction);
    if (!checkWallCollision(workingField, newPlayerPos)) {
        workingField[playerPos.x][playerPos.y] = FLOOR_TILE;
        workingField[newPlayerPos.x][newPlayerPos.y] = PLAYER_TILE;
    }
    if(!checkMobCollision(workingField, newPlayerPos)){
        // вызываемая функция , открывающая окно с битвой, и блокирующее движение
    }
    return workingField;
}

export function updatePlayer(map, player, direction) {
    const playerPos = playerFinder(map);
    const newPlayerPos = getNextPosition(playerPos, direction);
    if(checkMobCollision(map, newPlayerPos)){
        return {
            ...player,
            isFighting: true,
            fightingWith: getMobIdByCoordinates(newPlayerPos)
        };
    }
    return player;
}


function getMobIdByCoordinates(coords) {
    for(let mob of mobs) {
        if (mob.x === coords.x && mob.y === coords.y) {
            return mob.id;
        }
    }
}

/*
1. Копируем field
2. Находим игрока на field / PLAYER_TILE = 2
3. Прожимаем кнопку движения
4. Проверяем возможность для прохода
5. Изменяем позицию игрока
*/

export function checkWallCollision(map, playerPos) {
    if (playerPos.x >= DIMENSIONS || playerPos.x<0 || playerPos.y >= DIMENSIONS || playerPos.y<0) return true;
    return map[playerPos.x][playerPos.y] === WALL_TILE;
}

export function checkMobCollision(map, playerPos) {
    return map[playerPos.x][playerPos.y] === ENEMY_TILE;
}

export function mobFinder(workingField) {
    let x, y;
    for (let row = 0; row < workingField.length; row++) {
        for (let column = 0; column < workingField[row].length; column++) {
            if (workingField[row][column] === ENEMY_TILE) {
                x = row;
                y = column;
                break;
            }
        }
    }

    return {x, y};
}

export function playerFinder(workingField) {
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
export function initField() {
    const map = createMap();
    const mapWithEntities = getRandomSpawnEntities(map);
    return mapWithEntities;
}

function getRandomTile(min = DIMENSIONS, max = DIMENSIONS) {
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

//enemy functions
function initMobs(){
    const mobs = [];
    let mobCount = getRandomNumber(5, 20);
    for (let mC=0;mC<mobCount; mC++) {
        mobs.push({
            id: nanoid(),
            health: 20,
            dmg: 2,
        });
    }
    return mobs;
}

function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomMobSpawn(map, mob) {
    const copyField1 = copyField(map);

    // function 1
    let x, y;
    let isSpawned = false;
    do {
        x = getRandomTile(0, DIMENSIONS);
        y = getRandomTile(0, DIMENSIONS);
        if (copyField1[x][y] === FLOOR_TILE) {
            isSpawned = true;
        }
    } while (!isSpawned);
    //

    // function 2
    copyField1[x][y] = ENEMY_TILE;

    // function 3
    mob.x = x;
    mob.y = y;
    return copyField1;
}



function getRandomSpawnEntities(map){
    let mapWithEntities = getRandomPlayerSpawn(map);
    for (let mobIndex=0;mobIndex<mobs.length; mobIndex++) {
        mapWithEntities = getRandomMobSpawn(mapWithEntities, mobs[mobIndex]);
    }
    return mapWithEntities;
}

function fightMob(){
    
}

export default function(state = initialState, action) {
    switch (action.type) {
        case 'MOVE_CH':
            if (state.player.isFighting) return state;
            return {
                ...state, 
                map: movePlayer(state.map, action.payload), // updateMap?
                player: updatePlayer(state.map, state.player, action.payload),
            };
        case 'FIGHT_ACTION':
            if (!state.player.isFighting) return state;
            //  return {
            //      ...state, 
            //     player: fightMob( state.player, action.payload),
            //     mob : 
            //  };
        default:
            return state;
    }
}
