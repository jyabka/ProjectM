import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useKey } from 'react-use';
import './App.css';
import UI from './UI/UI';
import Header from './Header';
import { DIRECTIONS } from './configs/settings';
import { ACTIONS } from './store/action-types';
import FightWindow from './windows/fightWindow';
import GameOverWindow from './windows/gameOverWindow';
import { GAME_STATUS } from './store/gameReducer';
import {playWalkSound} from "./bin/playSound";

function App() {
    const dispatch = useDispatch();
    const status = useSelector(state => state.map.status);
    const upArrow = ['ц','w', 'W', 'ArrowUp'];
    const downArrow = ['ы','s', 'S', 'ArrowDown'];
    const leftArrow = ['ф','a', 'A', 'ArrowLeft'];
    const rightArrow = ['в','d', 'D', 'ArrowRight'];

    useKey(
        event => upArrow.includes(event.key),
        () => {
            dispatch({ type: ACTIONS.MOVE_CH, payload: DIRECTIONS.UP });
            playWalkSound();
        }
    );
    useKey(
        event => downArrow.includes(event.key),
        () => {
            dispatch({ type: ACTIONS.MOVE_CH, payload: DIRECTIONS.DOWN });
            playWalkSound();
        }
    );
    useKey(
        event => leftArrow.includes(event.key),
        () => {
            dispatch({ type: ACTIONS.MOVE_CH, payload: DIRECTIONS.LEFT });
            playWalkSound();
        }
    );
    useKey(
        event => rightArrow.includes(event.key),
        () => {
            dispatch({ type: ACTIONS.MOVE_CH, payload: DIRECTIONS.RIGHT });
            playWalkSound();
        }
    );

    return (
        <body className='window'>
          <Header />
          <UI />
            {status === GAME_STATUS.PLAYER_DIED && <GameOverWindow />}
            {status === GAME_STATUS.PLAYER_FIGHTING && <FightWindow />}
        </body>
    );
}

export default App;
