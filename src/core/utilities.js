export const range = (size, val) => {
    return Array(size).fill(val);
}

export function random(val) {
    return Math.floor(Math.random() * val);
}


export function between(min, max) {
    return random(max - min) + min;
}

export function eql(a, b) {
    if (typeof a === 'undefined' &&
        typeof b === 'undefined') {
        return true;
    }
    if (typeof a === 'undefined' ||
        typeof b === 'undefined') {
        return false;
    }
    return a === b;
}

export function randomRange(min, max) {
    return Math.random() * (max - min) + min;
}


export function rollXDice(x) {
    let sum = 0;
    for (let i = 0; i < x; i++) {
        sum += Math.round(randomRange(1, 6));
    }
    return sum;
}

export function weightedRange(min, max, weight) {
    if (weight < 1) return;
    let sum = 0;
    do {
        sum = rollXDice(weight);
        sum -= (3.5 * weight);
    } while (sum < 0)
    const rand = sum / 6;
    return Math.floor(rand * (max - min) + min);
}
