import React from 'react';
import MapPresenter from '../mapgen/mapPresenter';
import {useSelector} from "react-redux";
import {selectPlayer} from "../store/mapSelectors";
import './UI.css'

function UI() {
  const player = useSelector(selectPlayer)
    return (
        <div className='UI-container'>
          <div className='stats-container nes-container is-dark with-title'>
            <p className='title'>Statistics</p>
            <tbody className='nes-table is-dark'>
              <tr className ='hp'> <th>HP </th><th>{player.health}</th>  </tr>
              <tr className ='ad'> <th>AD </th><th>{player.dmg}</th> </tr>
              <tr className ='gc'> <th>GC </th><th>{player.score}</th> </tr>
            </tbody>
          </div>
          <div className='game-container'>
            <MapPresenter />
          </div>
          <div className='inventory-container nes-container is-dark with-title'>
            <p className='title'>Inventory</p>
          </div>
          <div className='dialog-container nes-container is-dark with-title'>
            <p className='title'>Dialogs and quests</p>
            <p>Work In Progress</p>
          </div>
          <div className='character-container nes-container is-dark'></div>
          <div className='tips-container nes-container is-dark'></div>
        </div>
    );
}
export default UI;
