import { nanoid } from 'nanoid';
import { createMap } from '../mapgen/map-generator';
import { DIMENSIONS } from '../mapgen/mapgen-settings';
import { DIRECTIONS, ENEMY_TILE, FLOOR_TILE, PLAYER_TILE, WALL_TILE } from '../configs/settings';
import { ACTIONS } from './action-types';

export const FIGHT_VARIANTS = {
    ATTACK: 'ATTACK',
    DEFEND: 'DEFEND'
};

export const GAME_STATUS = {
    PLAYER_WANDER: 2,
    PLAYER_FIGHTING: 1,
    PLAYER_DIED: 0
};

const mobs = initMobs();

const MOB_DMG = 5;

const min = 20;
const max = 40;

const initialState = {
    map: initField(),
    player: initPlayer(),
    status: initStatus(),
    mobs
};

//work w/ player
function initPlayer() {
    return {
        maxHealth: min + Math.floor(Math.random() * (max - min)),
        health: 20,
        dmg: 4,
        fightingWith: null
    };
}

function initStatus() {
    return GAME_STATUS.PLAYER_WANDER;
}

function mapUpdate(map, direction) {
    const workingField = copyField(map);
    // найти позицию игрока
    const playerPos = playerFinder(workingField);
    // вычислить следующую позицию
    const newPlayerPos = getNextPosition(playerPos, direction);
    if (!checkWallCollision(workingField, newPlayerPos)) {
        workingField[playerPos.x][playerPos.y] = FLOOR_TILE;
        workingField[newPlayerPos.x][newPlayerPos.y] = PLAYER_TILE;
    }
    if (!checkMobCollision(workingField, newPlayerPos)) {
        // вызываемая функция , открывающая окно с битвой, и блокирующее движение
    }
    return workingField;
}

export function getEnemyID(state, direction) {
    const playerPos = playerFinder(state.map);
    const newPlayerPos = getNextPosition(playerPos, direction);
    if (checkMobCollision(state.map, newPlayerPos)) {
        return getMobIdByCoordinates(state, newPlayerPos);
    }
}

function getMobIdByCoordinates(state, coords) {
    console.log(state.mobs);
    for (let mob of state.mobs) {
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
    if (
        playerPos.x >= DIMENSIONS ||
        playerPos.x < 0 ||
        playerPos.y >= DIMENSIONS ||
        playerPos.y < 0
    )
        return true;
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

    return { x, y };
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

    return { x, y };
}

function getNextPosition(playerPos, direction) {
    switch (direction) {
        case DIRECTIONS.UP:
            return { x: playerPos.x - 1, y: playerPos.y };
        case DIRECTIONS.DOWN:
            return { x: playerPos.x + 1, y: playerPos.y };
        case DIRECTIONS.LEFT:
            return { x: playerPos.x, y: playerPos.y - 1 };
        case DIRECTIONS.RIGHT:
            return { x: playerPos.x, y: playerPos.y + 1 };
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

/**
 * 1. Сгенерировать карту. +
 * 2. Генерим массив мобов. +
 * 3. Для моба находим место.
 *    3.1. Прописываем координаты в моба. +
 *    3.2. Меняем клетку на карте. +
 * 4. Возвращаем карту и мобов. +
 */
function initMapAndMobs() {
    const mobs = initMobs();
    let map = createMap();
    map = getRandomPlayerSpawn(map); // разместили игрока

    for (let mob of mobs) {
        const { x, y } = getRandomMobSpawnCoords(map);
        map[x][y] = ENEMY_TILE;
        mob.x = x;
        mob.y = y;
    }

    return { mobs, map };
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
function initMobs() {
    const mobs = [];
    let mobCount = getRandomNumber(2, 3);
    for (let mC = 0; mC < mobCount; mC++) {
        mobs.push({
            id: nanoid(),
            health: 20,
            dmg: 2
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

export function getRandomMobSpawnCoords(map) {
    const copyField1 = copyField(map);
    let x, y;
    let isSpawned = false;
    do {
        x = getRandomTile(0, DIMENSIONS);
        y = getRandomTile(0, DIMENSIONS);
        if (copyField1[x][y] === FLOOR_TILE) {
            isSpawned = true;
        }
    } while (!isSpawned);
    return { x, y };
}

function getRandomSpawnEntities(map) {
    let mapWithEntities = getRandomPlayerSpawn(map);
    for (let mobIndex = 0; mobIndex < mobs.length; mobIndex++) {
        mapWithEntities = getRandomMobSpawn(mapWithEntities, mobs[mobIndex]);
    }
    return mapWithEntities;
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ACTIONS.MOVE_CH:
            if (state.status !== GAME_STATUS.PLAYER_WANDER) return state;
            const enemyId = getEnemyID(state, action.payload);
            if (enemyId) {
                return {
                    ...state,
                    status: GAME_STATUS.PLAYER_FIGHTING,
                    player: {
                        ...state.player,
                        fightingWith: enemyId
                    }
                };
            }
            return {
                ...state,
                map: mapUpdate(state.map, action.payload)
            };
        case ACTIONS.FIGHT_ACTION:
            if (state.status !== GAME_STATUS.PLAYER_FIGHTING) return state;
            let mobKilled;
            const mobs = state.mobs
                .map(mob => {
                    if (mob.id === state.player.fightingWith) {
                        if (mob.health > 0)
                            return { ...mob, health: mob.health - state.player.dmg };
                        else {
                            mobKilled = mob;
                            return false;
                        }
                    }
                    return mob;
                })
                .filter(Boolean);

            if (mobs.length === 0) {
                const mapAndMobs = initMapAndMobs();
                return {
                    ...state,
                    mobs: mapAndMobs.mobs,
                    map: mapAndMobs.map,
                    status: GAME_STATUS.PLAYER_WANDER
                };
            }

            if (mobKilled) {
                const newMap = copyField(state.map);
                newMap[mobKilled.x][mobKilled.y] = FLOOR_TILE;

                return {
                    ...state,
                    map: newMap,
                    mobs,
                    player: {
                        ...state.player,
                        fightingWith: null
                    },
                    status: GAME_STATUS.PLAYER_WANDER
                };
            }

            if (state.player.health - MOB_DMG <= 0) {
                return {
                    ...state,
                    status: GAME_STATUS.PLAYER_DIED
                };
            }

            return {
                ...state,
                mobs,
                player: {
                    ...state.player,
                    health: state.player.health - MOB_DMG
                }
            };

        case ACTIONS.DEFEND_ACTION:
            if (state.status !== GAME_STATUS.PLAYER_FIGHTING) return state;
            return {
                ...state,
                player: {
                    ...state.player,
                    health: state.player.health + state.player.maxHealth
                }
            };
        case ACTIONS.NEXT_LEVEL:
            return state;

        case ACTIONS.RESET:
            return initialState;

        default:
            return state;
    }
}
