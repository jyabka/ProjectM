const initialState = {
    health: 100,
    xp: 0,
    weapon: {
        name: 'Knobstick',
        dmg: 6
    }
};

const playerReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_PLAYER_POSITION':
            return {
                ...action.payload
            }
        default: return state
    }
}
export default playerReducer