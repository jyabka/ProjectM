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
      <button type="button" class="nes-btn is-success"onClick = {() => 
        dispatch({
          type:'DEFEND_ACTION',
          payload: FIGHT_VARIANTS.DEFEND
        })}>
        Defend
      </button>
      <span className="nes-text is-disabled">{mob.health} {mob.dmg}</span>
      <br />
      <span className="nes-text is-disabled">{player.health} {player.dmg}</span>
    </div>
  );
}