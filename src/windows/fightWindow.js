import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './fightWindow.css';
import 'nes.css/css/nes.css';
import { selectFightingMob, selectPlayer } from '../store/mapSelectors';
import { FIGHT_VARIANTS } from '../store/gameReducer';

export default function FightWindow() {
    const mob = useSelector(selectFightingMob);
    const dispatch = useDispatch();
    const player = useSelector(selectPlayer);
    const [disable, setDisable] = useState(true);

    function colorHandler(disable) {
        return disable ? 'is-normal' : 'is-disabled';
    }

    return (
        <div className="fhtWindow">
            <button
                type="button"
                className="nes-btn is-primary"
                onClick={() =>
                    dispatch({
                        type: 'FIGHT_ACTION',
                        payload: FIGHT_VARIANTS.ATTACK
                    })
                }
            >
                Attack
            </button>
            <button
                type="button"
                className={'nes-btn' + ' ' + colorHandler(disable)}
                disabled={!disable}
                onClick={() => {
                    dispatch({
                        type: 'DEFEND_ACTION',
                        payload: FIGHT_VARIANTS.DEFEND
                    });
                    setDisable(!disable);
                }}
            >
                Defend
            </button>
            <br />
            <span className="nes-text is-disabled">Enemy HP:{mob.health} DMG:2</span>
            <br />
            <span className="nes-text is-disabled">
                PLayer HP:{player.health} DMG:{player.dmg} SCORE: {player.score}
            </span>
        </div>
    );
}
