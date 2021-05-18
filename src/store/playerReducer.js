import {PLAYER_DO_DMG, PLAYER_GET_DMG} from "./action-types";
import Player from "../player/player";


export const initialState = {
    health: 100,
    xp: 0,
};

function playerDoDamage(){

}
function playerGetDamage(){

}

const playerReducer = (state = initialState, action) => {
    switch (action.type) {
        case PLAYER_DO_DMG:
            return {

            }
        case PLAYER_GET_DMG:
            return {

            }
        default: return state
    }
}
export default playerReducer;
