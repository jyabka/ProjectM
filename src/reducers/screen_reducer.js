const screenInitialState = {
    top: 0,
    left: 0,
}

export const screenReducer = (state = screenInitialState, action) => {
    switch (action.type) {
        case 'RESET_DATA':
            return screenInitialState;
        case 'SET_SCREEN_OFFSET':
            return Object.assign(
                {}, state, {
                    top: action.top,
                    left: action.left
                }
            )
        default:
            return state
    }
}

export default screenReducer