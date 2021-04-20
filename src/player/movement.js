import store from '../configs/store'
import { SPRITE_SIZE } from "../configs/settings";

export default function Movement(player){

    function getNewPosition(direction){
        /**/ // Допилить перемещение и пофиксить switch
        const oldPosition = store.getState().player.position
        switch(direction) {
            case 'Left':
                return [ oldPosition[0] - SPRITE_SIZE , oldPosition[1] ]
            case 'Right':
                return [ oldPosition[0] + SPRITE_SIZE , oldPosition[1] ]
            case 'Up':
                return [ oldPosition[0]  , oldPosition[1] - SPRITE_SIZE ]
            case 'Down':
                return [ oldPosition[0]  , oldPosition[1] + SPRITE_SIZE ]
        }
    }

    function dispatchMove(direction){
        store.dispatch({
            type: 'MOVE_CH',
            payload:{
                position: getNewPosition(direction)
            }

        })
    }

    function handleKeyDown(e){
        e.preventDefault()

        switch(e.keyCode){
            case 37:
                return dispatchMove('Left')
            case 38:
                return dispatchMove('Up')
            case 39:
                return dispatchMove('Right')
            case 40:
                return dispatchMove('Down')
        }

    }
    window.addEventListener('keydown',(e) => {
        handleKeyDown(e)
    })


    return player
}