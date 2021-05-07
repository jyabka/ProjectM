import dungeoneer from 'dungeoneer';

export default function generateDungeon(width, height) {
    const dungeon = dungeoneer.build({
        width,
        height,
    });
    dungeon.width = width;
    dungeon.height = height;

    dungeon.get = function (x, y) {
        if (x < 0 || x >= width) return false;
        if (y < 0 || y >= height) return false;
        return this.tiles[x][y];
    }

    dungeon.check = function (x, y, type, outOfBounds = false) {
        if (!this.get(x, y) && outOfBounds) return true;
        return (this.get(x, y) && this.get(x, y).type === type);
    }

    dungeon.get4BitMask = function (x, y, type, outOfBounds = false) {
        let N = this.check(x, y - 1, type, outOfBounds);
        let E = this.check(x + 1, y, type, outOfBounds);
        let S = this.check(x, y + 1, type, outOfBounds);
        let W = this.check(x - 1, y, type, outOfBounds);
        return `${+N}${+E}${+S}${+W}`;
    }

    dungeon.get8BitMask = function (x, y, type, outOfBounds = false) {
        let NW = this.check(x - 1, y - 1, type, outOfBounds);
        let N = this.check(x, y - 1, type, outOfBounds);
        let NE = this.check(x + 1, y - 1, type, outOfBounds);
        let E = this.check(x + 1, y, type, outOfBounds);
        let SE = this.check(x + 1, y + 1, type, outOfBounds);
        let S = this.check(x, y + 1, type, outOfBounds);
        let SW = this.check(x - 1, y + 1, type, outOfBounds);
        let W = this.check(x - 1, y, type, outOfBounds);
        return `${+NW}${+N}${+NE}${+E}${+SE}${+S}${+SW}${+W}`;
    }

    return dungeon;
}
