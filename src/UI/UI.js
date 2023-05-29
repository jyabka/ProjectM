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
            <tr>  <th>HP </th><th>{player.health}</th>  </tr>
            <tr>  <th>AP </th><th>{player.dmg}</th> </tr>
            <tr>  <th>SP </th><th>{player.score}</th> </tr>
            </tbody>
          </div>
            <MapPresenter />
          <div className='inventory-container nes-container is-dark with-title'>
            <p className='title'>Inventory</p>
          </div>
        </div>
    );
}
export default UI;
