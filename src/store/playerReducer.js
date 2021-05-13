import {SPRITE_SIZE, DIRECTIONS} from '../configs/settings'

export const MOVE_CH = 'MOVE_CH';

export const initialState = {
    direction: DIRECTIONS.RIGHT,
    health: 100,
    xp: 0,
    weapon: {
        name: 'Knobstick',
        dmg: 6
    }
};

function getNextPositionWithoutCollisionCheck(oldPosition, direction) {
     switch(direction) {
        case DIRECTIONS.LEFT:
            return [ oldPosition[0] - SPRITE_SIZE , oldPosition[1] ]
        case DIRECTIONS.RIGHT:
            return [ oldPosition[0] + SPRITE_SIZE , oldPosition[1] ]
        case DIRECTIONS.UP:
            return [ oldPosition[0]  , oldPosition[1] - SPRITE_SIZE ]
        case DIRECTIONS.DOWN:
            return [ oldPosition[0]  , oldPosition[1] + SPRITE_SIZE ]
        default: return oldPosition;
    }
}

/*export function borderObserver(oldPosition, newPosition) {
    // WTF???
    return (newPosition[0] < 0 || newPosition[0] >  SCREEN_WIDTH  || newPosition[1] < 0 || newPosition[1] > SCREEN_HEIGHT)
        ? oldPosition
        : newPosition;
}*/

export function getNextPosition(oldPosition, direction) {
    return getNextPositionWithoutCollisionCheck(oldPosition, direction)
}


const playerReducer = (state = initialState, action) => {
    switch (action.type) {
        case MOVE_CH:
            return {
                ...state,
                position: getNextPosition(state.position, action.payload)
            };
        default: return state
    }
}
export default playerReducer;
