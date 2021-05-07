import { random, between } from './utilities';
import generateDungeon from './dungeon'

const mapTiles = { "0": 1, "1": 0, "3":3,"4": 9, "5": 9, "6": 9, "7": 7, "12": 9, "13": 0, "14": 9, "15": 7, "16": 0, "17": 0, "19": 2, "20": 9, "21": 9, "22":9, "23": 7, "24": 5, "25": 2, "28": 8, "29": 8, "30": 8, "31": 0, "48": 0, "49": 1, "51": 0, "52": 9, "57": 2, "60": 8, "63": 6, "55": 7, "56": 0, "61": 8, "64": 4, "65": 1, "68": 12, "69": 12, "70": 12, "71": 7, "76": 12, "78": 12, "79": 7, "80": 1, "81": 5, "84": 12, "85": 12, "87": 7, "88":3, "92": 8, "93": 8, "94": 8, "95": 0, "96": 1, "97": 0, "100": 12, "102": 12, "103": 7, "112": 6, "113": 5, "115": 0, "116": 12, "117": 12, "118": 12, "119": 7, "120": 0, "121": 0, "124": 11, "125": 11, "126": 11, "127": 14, "129": 0, "131": 0, "133": 9, "135": 7, "145": 2, "147": 2, "151":7, "153": 0, "157":8, "159": 5, "192": 2, "193": 5, "195": 0, "196": 12, "197": 12, "199": 10, "204": 12, "205": 12, "207": 10, "208":0, "209": 2, "211": 0, "213": 12, "215": 10, "217": 0, "220": 1, "221": 8, "223": 13, "224": 0, "225": 0, "228": 12, "229": 12, "231": 10, "240": 3, "241": 0, "243": 1, "244": 12, "245": 9, "247": 10, "249": 0, "252": 11, "253": 11 }

export function generateMap(width, height) {

    const dungeon = generateDungeon(width, height);

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            const type = dungeon.get(x, y).type;
            if (type === 'wall') {
                const mask = dungeon.get8BitMask(x, y, 'wall', true);
                const textureCode = parseInt(mask, 2) || 0;
                if (typeof mapTiles[textureCode] === 'undefined') {
                    dungeon.tiles[x][y].texture = 'empty';
                } else {
                    dungeon.tiles[x][y].texture = mapTiles[textureCode];
                }
                dungeon.tiles[x][y].orig = textureCode;
            } else if (type === 'floor' || type === 'door') {
                dungeon.tiles[x][y].texture = '15';
            }
            // convenience
            dungeon.tiles[x][y].x = x;
            dungeon.tiles[x][y].y = y;

            // Seems these parameters are causing problems for redux dev tool (and cyclical datastructures aren't supposed to be used with redux)
            delete dungeon.tiles[x][y].neighbours;
            delete dungeon.tiles[x][y].nesw;
        }
    }

    return dungeon;
}

export function getSpawnFromRoom(room) {
    return {
        x: between(room.x, room.x + room.width),
        y: between(room.y, room.y + room.height),
    }
}

export function getRandomSpawn(rooms) {
    const roomCount = rooms.length;
    return getSpawnFromRoom(rooms[random(roomCount)]);
}

export function getMultipleSpawns(rooms, n) {
    let spawns = new Map();
    while (spawns.size < n) {
        const spawn = getRandomSpawn(rooms);
        spawns.set(`${spawn.x}x${spawn.y}`, spawn)
    }
    return [...spawns.values()];
}