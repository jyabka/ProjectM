import Const from '../constants/settings'
import { generateMap } from '../core/mapgen'

const mapInitialState = generateMap(Const.WIDTH, Const.HEIGHT);

export const mapgenReducer = (state = mapInitialState, action) => {
    switch (action.type) {
        case 'RESET_DATA':
            return generateMap(Const.WIDTH, Const.HEIGHT);
        default:
            return state
    }
}

export default mapgenReducer