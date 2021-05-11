import { connect } from 'react-redux';
import Core from '../outputers/core';
import GameGen from '../core/index';
import Const from '../constants/settings';
import {
    spawnSprite,
    setSpritePosition,
    setSpritePower,
    setScreenOffset,
} from '../actions/index';

const mapStateToProps = (state) => {

    const sprites = new Map();
    const player = state.sprites.filter(sprite => sprite.name === Const.PLAYER)[0];
    state.sprites.forEach(sprite => {
        sprites.set(`${sprite.x}x${sprite.y}`, sprite)
    })

    return {
        tiles: state.map.tiles,
        rooms: state.map.rooms,
        screen: state.screen,
        sprites: sprites,
        player: player,
        game: state.game,
    }
}

const mapDispatchToProps = (dispatch) => {

    const spawnSprites = (type, maxLevel, count, spawns) => {
        for (let i = 0; i < count; i++) {
            let level = i % maxLevel + 1;
            dispatch(spawnSprite(
                type, level, spawns.pop()
            ));
        }
    }

    function setupGame(dispatch, getState)
    {
        const { rooms } = getState().map;
        const playerSpawn = GameGen.getSpawnFromRoom(rooms[0]);
        const spawns = GameGen.getMultipleSpawns(rooms.slice(1), 100);

        spawnSprites(Const.ENEMY, Const.ENEMY_LVL, Const.ENEMY_COUNT, spawns, dispatch);

        dispatch(spawnSprite(Const.PLAYER, 1, playerSpawn));

        return playerSpawn;
    }

    return {
        setupGame: () => {
            return dispatch(setupGame)
        },

        setPower: (id, power) => {
            dispatch(setSpritePower(id, power));
        },

        setScreen: ({top, left}) => {
            dispatch(setScreenOffset(top, left));
        },

        moveSprite: (id, x, y) => {
            dispatch(setSpritePosition(id, x, y));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Core);
