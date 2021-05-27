import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './fightWindow.css';
import 'nes.css/css/nes.css';
import {selectFightingMob,selectPlayer} from '../store/mapSelectors';
import { FIGHT_VARIANTS } from '../store/mapReducer';

export default function FightWindow() {
  const mob = useSelector(selectFightingMob);
  const dispatch = useDispatch();
  const player = useSelector(selectPlayer);
    
  return (
    <div className="fhtWindow">
      <button type="button" class="nes-btn is-primary" onClick={() =>
          dispatch({
            type: 'FIGHT_ACTION',
            payload: FIGHT_VARIANTS.ATTACK
          })
        }
      >
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