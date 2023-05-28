import { ENEMY_TILE, PLAYER_TILE, WALL_TILE } from '../configs/settings';
import { useSelector } from 'react-redux';
import './map_design.css';
import {selectPlayer} from "../store/mapSelectors";

function Cell({ cell, cellColumn }) {
  function getClassName(cell) {
    switch (cell) {
      case WALL_TILE:
        return 'wall';
      case PLAYER_TILE:
        return 'player';
      case ENEMY_TILE:
        return 'mob';
      default:
        return 'tunnel';
    }
  }

  return (
    <td className={getClassName(cell)} key={cellColumn}>
      {' '}
    </td>
  );
}

export default function MapPresenter() {
  const mapField = useSelector(state => state.map.map);
  const player = useSelector(selectPlayer)
  return (
    <div className='map_container'>
      <div className='stats_container nes-container is-dark with-title'>
        <p className='title'>Statistics</p>
        <tbody className='stat_list'>
        <tr>
          <th>HP|Health </th><th> : {player.health}</th>
        </tr>
        <tr>
          <th>AP|Attack </th><th> : {player.dmg}</th>
        </tr>
        <tr>
          <th>SP|Score </th><th> : {player.score}</th>
        </tr>
        </tbody>
      </div>
      <table className='grid nes-container is-dark'>
        <thead>
        {mapField.map((obj, row) => (
          <tr key={row}>
            {obj.map((obj2, col) => (
              <Cell cell={obj2} cellColumn={col} key={col} />
            ))}
          </tr>
        ))}
        </thead>
      </table>
    </div>
  );
}
