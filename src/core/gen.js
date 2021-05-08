const Victor = require('victor');
const _ = require('underscore');

const Room = require('./room');
const Tile = require('./tile');

const Dungeon = function Dungeon() {
    let numRoomTries = 50;
    let extraConnectorChance = 50;
    let roomExtraSize = 0;
    let windingPercent = 50;
    let _rooms = [];
    let _currentRegion = -1;
    let stage;

    const n = new Victor(0, 1);
    const e = new Victor(1, 0);
    const s = new Victor(0, -1);
    const w = new Victor(-1, 0);

    const cardinalDirections = [n, e, s, w];

    const bindStage = (givenStage) => {
        stage = givenStage;
    };

    let _tiles = [];

    const getTile = (x, y) => {
        return _tiles[x][y];
    };

    const setTile = (x, y, type) => {
        if (_tiles[x] && _tiles[x][y]) {
            _tiles[x][y].type = type;
            _tiles[x][y].region = _currentRegion;

            return _tiles[x][y];
        }

        throw new RangeError(`tile at ${x}, ${y} is unreachable`);
    };

    const fill = (type) => {
        let neighbours = [];
        let cardinalDir = {};
        let x;
        let y;

        for (x = 0; x < stage.width; x++) {
            _tiles.push([]);
            for (y = 0; y < stage.height; y++) {
                _tiles[x].push(new Tile(type));
            }
        }

        for (x = 0; x < stage.width; x++) {
            for (y = 0; y < stage.height; y++) {
                neighbours = [];
                cardinalDir = {};
                if (_tiles[x][y - 1]) {
                    neighbours.push(_tiles[x][y - 1]);
                    cardinalDir.north = _tiles[x][y - 1];
                }
                if (_tiles[x + 1] && _tiles[x + 1][y - 1]) {
                    neighbours.push(_tiles[x + 1][y - 1]);
                }
                if (_tiles[x + 1] && _tiles[x + 1][y]) {
                    neighbours.push(_tiles[x + 1][y]);
                    cardinalDir.east = _tiles[x + 1][y];
                }
                if (_tiles[x + 1] && _tiles[x + 1][y + 1]) {
                    neighbours.push(_tiles[x + 1][y + 1]);
                }
                if (_tiles[x] && _tiles[x][y + 1]) {
                    neighbours.push(_tiles[x][y + 1]);
                    cardinalDir.south = _tiles[x][y + 1];
                }
                if (_tiles[x - 1] && _tiles[x - 1][y + 1]) {
                    neighbours.push(_tiles[x - 1][y + 1]);
                }
                if (_tiles[x - 1] && _tiles[x - 1][y]) {
                    neighbours.push(_tiles[x - 1][y]);
                    cardinalDir.west = _tiles[x - 1][y];
                }
                if (_tiles[x - 1] && _tiles[x - 1][y - 1]) {
                    neighbours.push(_tiles[x - 1][y - 1]);
                }
                _tiles[x][y].setNeighbours(neighbours);
                _tiles[x][y].directions = cardinalDir;
            }
        }

        return _tiles;
    };

    const generate = (stage, debug = false) => {
        let startDate = Date.now();
        if (stage.width % 2 === 0 || stage.height % 2 === 0) {
            throw new Error('The stage must be odd-sized.');
        }

        bindStage(stage);

        fill('wall');

        _addRooms();

        // Fill in all of the empty space with mazes.
        for (let y = 1; y < stage.height; y += 2) {
            for (let x = 1; x < stage.width; x += 2) {
                // Skip the maze generation if the tile is already carved
                if (getTile(x, y).type === 'floor') {
                    continue;
                }
                _growMaze(x, y);
            }
        }

        _connectRegions();
        _removeDeadEnds();

        let endDate = Date.now();

        if (debug) {
            console.log('Dungeon generated in ' + (endDate - startDate) + 'ms');
        }

        return {
            rooms: _rooms,
            tiles: _tiles,
        };
    };

    const _growMaze = (startX, startY) => {
        let cells = [];
        let lastDir;

        if (_tiles[startX][startY].neighbours.filter(x => x.type === 'floor').length > 0) {
            return;
        }

        _startRegion();
        _carve(startX, startY);

        cells.push(new Victor(startX, startY));

        let count = 0;

        while (cells.length && count < 500) {
            count++;
            let cell = cells[cells.length - 1];

            // See which adjacent cells are open.
            let unmadeCells = [];

            for (let dir of cardinalDirections) {
                if (_canCarve(cell, dir)) {
                    unmadeCells.push(dir);
                }
            }

            if (unmadeCells.length) {
                let dir;
                let cellsConvertedToStr = unmadeCells.map(v => v.toString());
                if (lastDir && cellsConvertedToStr.indexOf(lastDir.toString()) > -1 && _.random(1, 100) > windingPercent) {
                    dir = lastDir.clone();
                } else {
                    let rand = _.random(0, unmadeCells.length - 1);
                    dir = unmadeCells[rand].clone();
                }

                let carveLoc1 = cell.clone().add(dir).toObject();
                _carve(carveLoc1.x, carveLoc1.y);

                let carveLoc2 = cell.clone().add(dir).add(dir).toObject();
                _carve(carveLoc2.x, carveLoc2.y);

                cells.push(cell.clone().add(dir).add(dir));

                lastDir = dir.clone();
            } else {
                cells.pop();
                lastDir = null;
            }
        }
    };

    const _addRooms = () => {
        for (let i = 0; i < numRoomTries; i++) {
            let size = _.random(1, 3 + roomExtraSize) * 2 + 1;
            let squareness = _.random(0, 1 + Math.floor(size / 2)) * 2;
            let width = size;
            let height = size;
            if (_oneIn(2)) {
                width += squareness;
            } else {
                height += squareness;
            }

            let x = _.random(0, Math.floor((stage.width - width) / 2)) * 2 + 1;
            let y = _.random(0, Math.floor((stage.height - height) / 2)) * 2 + 1;

            if (x > stage.width - width) {
                x = stage.width - width - 1;
            }

            if (y > stage.height - height) {
                y = stage.height - height - 1;
            }

            let room = new Room(x, y, width, height);

            let overlaps = false;

            for (let other of _rooms) {
                if (room.intersects(other)) {
                    overlaps = true;
                    break;
                }
            }

            if (overlaps) {
                continue;
            }
            _rooms.push(room);
            _startRegion();

            carveArea(x, y, width, height);
        }
    };

    const carveArea = (x, y, width, height) => {
        for (let i = x; i < x + width; i++) {
            for (let j = y; j < y + height; j++) {
                _carve(i, j);
            }
        }
    };

    const _connectRegions = () => {
        let regionConnections = {};
        _tiles.forEach(row => {
            row.forEach(tile => {
                if (tile.type === 'floor') {
                    return;
                }

                let tileRegions = _.unique(
                    _.values(tile.nesw).map(x => x.region)
                        .filter(x => !_.isUndefined(x))
                );
                if (tileRegions.length <= 1) {
                    return;
                }

                let key = tileRegions.join('-');
                if (!regionConnections[key]) {
                    regionConnections[key] = [];
                }
                regionConnections[key].push(tile);

            });
        });

        _.each(regionConnections, (connections) => {
            let index = _.random(0, connections.length - 1);
            connections[index].type = 'door';
            connections.splice(index, 1);

            connections.forEach(conn => {
                if (_oneIn(extraConnectorChance)) {
                    conn.type = 'door';
                }
            });
        });
    };

    const _oneIn = (num) => {
        return _.random(1, num) === 1;
    };

    const _removeDeadEnds = () => {
        let done = false;

        const cycle = () => {
            let done = true;
            _tiles.forEach((row) => {
                row.forEach((tile) => {
                    // If it only has one exit, it's a dead end --> fill it in!
                    if (tile.type === 'wall') {
                        return;
                    }
                    if (_.values(tile.nesw).filter(t => t.type !== 'wall').length <= 1) {
                        tile.type = 'wall';
                        done = false;
                    }
                });
            });

            return done;
        };

        while (!done) {
            done = true;
            done = cycle();
        }
    };

    const _canCarve = (cell, direction) => {
        let end = cell.clone().add(direction).add(direction).add(direction).toObject();

        if (!_tiles[end.x] || !_tiles[end.x][end.y]) {
            return false;
        }

        if (getTile(end.x, end.y).type !== 'wall') {
            return false;
        }

        let dest = cell.clone().add(direction).add(direction).toObject();
        return getTile(dest.x, dest.y).type !== 'floor';
    };

    const _startRegion = () => {
        _currentRegion++;
        return _currentRegion;
    };

    const _carve = (x, y, type = 'floor') => {
        setTile(x, y, type);
    };

    return {
        generate,
    };
};

const generate = (options) => {
    return new Dungeon().generate(options);
};

module.exports = {
    generate
};
