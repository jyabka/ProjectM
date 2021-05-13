import store from "../store/store";
import { SCREEN_HEIGHT, SPRITE_SIZE, SCREEN_WIDTH } from "../configs/settings";

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

    function borderObserver(oldPosition, newPosition)
    {
        return (newPosition[0] >= 0 && newPosition[0] <=  SCREEN_WIDTH)
        &&
        (newPosition[1] >= 0 && newPosition[1] <=  SCREEN_HEIGHT)
            ? newPosition : oldPosition
    }

    function dispatchMove(direction){
        const oldPosition = store.getState().player.position
        store.dispatch({
            type: 'MOVE_CH',
            payload:{
                position: borderObserver(oldPosition, getNewPosition(direction))
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

    function movePlayer(x, y){
        const { tiles, player } = this.props;

        if (tiles[x][y].type !== 'wall') {
            return this.props.changePlayerPosition(x, y);
        }
    }

    return player
}
