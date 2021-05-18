import { useDispatch } from 'react-redux';
import { useKey } from 'react-use';
import './App.css';
import Universe from "./universe/universe";
import Header from "./Header"
import {DIRECTIONS} from "./configs/settings";
import {MOVE_CH} from "./store/action-types";


function App() {
  const dispatch = useDispatch();
  const upArrow = ['w', 'W', 'ArrowUp'];
  const downArrow = ['s', 'S', 'ArrowDown'];
  const leftArrow = ['a', 'A', 'ArrowLeft'];
  const rightArrow = ['d', 'D', 'ArrowRight'];
  
  useKey(
    event => upArrow.includes(event.key),
    () => {
      dispatch({type: MOVE_CH, payload: DIRECTIONS.UP});
    }
  );
  useKey(
    event => downArrow.includes(event.key),
    () => {
      dispatch({type: MOVE_CH, payload: DIRECTIONS.DOWN});
    }
  );
  useKey(
    event => leftArrow.includes(event.key),
    () => {
      dispatch({type: MOVE_CH, payload: DIRECTIONS.LEFT});
    }
  );
  useKey(
    event => rightArrow.includes(event.key),
    () => {
      dispatch({type: MOVE_CH, payload: DIRECTIONS.RIGHT});
    }
  );

  return (
    <div>
      <Header/>
      <Universe/>
    </div>
  );
}

export default App;