const Room = function Room(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
};

Room.prototype.getBoundingBox = function getBoundingBox() {
    return {
        top: this.y,
        right: this.x + this.width,
        bottom: this.y + this.height,
        left: this.x
    };
};

Room.prototype.intersects = function intersects(other) {
    if (!other.getBoundingBox) {
        throw new Error('Given entity has no method getBoundingBox');
    }
    const r1 = this.getBoundingBox();
    const r2 = other.getBoundingBox();

    return !(r2.left > r1.right ||
        r2.right < r1.left ||
        r2.top > r1.bottom ||
        r2.bottom < r1.top);
};

module.exports = Room;
