import React from 'react';
import { useSelector } from 'react-redux';
import './fightWindow.css';
import 'nes.css/css/nes.css';
import {selectFightingMob,selectPlayer} from '../store/mapSelectors';

export default function FightWindow() {
  const mob = useSelector(selectFightingMob);
  const player = useSelector(selectPlayer);
    
  return (
    <div className="fhtWindow">
      <button type="button" class="nes-btn is-primary">
        Attack
      </button>
      <button type="button" class="nes-btn is-success">
        Defend
      </button>
      <button type="button" class="nes-btn is-warning">
        Inventory
      </button>
      <h3>{mob.health} {mob.dmg}</h3>
      <h3>{player.health} {player.dmg}</h3>
    </div>
  );
}