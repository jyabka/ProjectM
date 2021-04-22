import { useDispatch } from 'react-redux';
import { useKey } from 'react-use';
import './App.css';
import Universe from "./universe/universe";
import Header from "./Header"
import {MOVE_CH,DIRECTIONS} from "./player/reducer"


function App() {
  const dispatch = useDispatch();
  const upArrow = ['w', 'W', 'ArrowUp'];
  const downArrow = ['s', 'S', 'ArrowDown'];
  const leftArrow = ['a', 'A', 'ArrowLeft'];
  const rightArrow = ['d', 'D', 'ArrowRight'];
  
  useKey(
    event => upArrow.includes(event.key),
    () => {
      dispatch({type: MOVE_CH, direction: DIRECTIONS.UP});
    }
  );
  useKey(
    event => downArrow.includes(event.key),
    () => {
      dispatch({type: MOVE_CH, direction: DIRECTIONS.DOWN});
    }
  );
  useKey(
    event => leftArrow.includes(event.key),
    () => {
      dispatch({type: MOVE_CH, direction: DIRECTIONS.LEFT});
    }
  );
  useKey(
    event => rightArrow.includes(event.key),
    () => {
      dispatch({type: MOVE_CH, direction: DIRECTIONS.RIGHT});
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