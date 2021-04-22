import {SPRITE_SIZE,SCREEN_WIDTH,SCREEN_HEIGHT} from '../configs/settings'

export const MOVE_CH = 'MOVE_CH';

export const DIRECTIONS = {
    RIGHT: 'Right',
    LEFT: 'Left',
    DOWN: 'Down',
    UP: 'Up'
}

const initialState = {
    position: [1,2],
    direction: DIRECTIONS.RIGHT,
    health: 100,
    xp: 0,
    weapon: {
        name: 'Knobstick',
        dmg: 6
    }
};

function getNextPosition(oldPosition, direction) {
     switch(direction) {
        case 'Left':
            return [ oldPosition[0] - SPRITE_SIZE , oldPosition[1] ]
        case DIRECTIONS.RIGHT:
            return [ oldPosition[0] + SPRITE_SIZE , oldPosition[1] ]
        case 'Up':
            return [ oldPosition[0]  , oldPosition[1] - SPRITE_SIZE ]
        case 'Down':
            return [ oldPosition[0]  , oldPosition[1] + SPRITE_SIZE ]
    }
}

// function boderObserver(oldPosition, newPosition) {
//     // WTF???
//     return (newPosition[0] >= 0 && newPosition[0] <=  SCREEN_WIDTH)
//     &&
//     (newPosition[1] >= 0 && newPosition[1] <=  SCREEN_HEIGHT)
//         ? newPosition : oldPosition
// }

const playerReducer = (state = initialState, action) => {
    switch (action.type) {
        case MOVE_CH:
            return {
                ...state,
                position: (
                    state.position,
                    getNextPosition(state.position, action.payload)
                )
            }
        default: return state
    }
}
export default playerReducer