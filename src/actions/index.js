export const setSpritePosition = (id, x, y) => ({
    type: 'SET_SPRITE_POSITION',
    id,
    x,
    y,
})

export const spawnSprite = (name, level, {x, y}) => ({
    type: 'SPAWN_SPRITE',
    name,
    level,
    x,
    y,
})

export const setSpritePower = (id, power) => ({
    type: 'SET_SPRITE_POWER',
    id,
    power,
})

export const setScreenOffset = (top, left) => ({
    type: 'SET_SCREEN_OFFSET',
    top,
    left,
})