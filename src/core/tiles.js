const Tile = function Tile(type) {
    this.type = type;
    this.neighbours = [];
};

Tile.prototype.setNeighbours = function(neighbours) {
    this.neighbours = neighbours;
    return this;
};

module.exports = Tile;
