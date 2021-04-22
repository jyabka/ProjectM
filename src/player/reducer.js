const initialState = {
    position: [1,2],
    // direction:
    health: 100,
    xp: 0,
    weapon: {
        name: 'Knobstick',
        dmg: 6
    }
};

const playerReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'MOVE_CH':
            return {
                ...action.payload
            }
        default: return state
    }
}
export default playerReducer