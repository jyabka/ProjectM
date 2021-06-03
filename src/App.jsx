import { useDispatch, useSelector } from 'react-redux';
import { useKey } from 'react-use';
import './App.css';
import Universe from "./universe/universe";
import Header from "./Header"
import {DIRECTIONS} from "./configs/settings";
import {ACTIONS} from "./store/action-types";
import FightWindow from "./windows/fightWindow";
import GameOverWindow from "./windows/gameOverWindow";
import {GAME_STATUS} from "./store/gameReducer";


function App() {
  const dispatch = useDispatch();
  const status = useSelector(state => state.map.status);
  const upArrow = ['w', 'W', 'ArrowUp'];
  const downArrow = ['s', 'S', 'ArrowDown'];
  const leftArrow = ['a', 'A', 'ArrowLeft'];
  const rightArrow = ['d', 'D', 'ArrowRight'];
  
  useKey(
    event => upArrow.includes(event.key),
    () => {
      dispatch({type: ACTIONS.MOVE_CH, payload: DIRECTIONS.UP});
    }
  );
  useKey(
    event => downArrow.includes(event.key),
    () => {
      dispatch({type: ACTIONS.MOVE_CH, payload: DIRECTIONS.DOWN});
    }
  );
  useKey(
    event => leftArrow.includes(event.key),
    () => {
      dispatch({type: ACTIONS.MOVE_CH, payload: DIRECTIONS.LEFT});
    }
  );
  useKey(
    event => rightArrow.includes(event.key),
    () => {
      dispatch({type: ACTIONS.MOVE_CH, payload: DIRECTIONS.RIGHT});
    }
  );

  return (
    <div>
      <Header/>
      <Universe/>
      {status === GAME_STATUS.PLAYER_DIED && <GameOverWindow/>}
      {status === GAME_STATUS.PLAYER_FIGHTING && <FightWindow/>}
    </div>
  );
}

export default App;