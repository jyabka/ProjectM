import React from 'react';
import './gameOverWindow.css';
import 'nes.css/css/nes.css';
import {useDispatch} from "react-redux";
import {ACTIONS} from "../store/action-types"

export default function GameOverWindow() {
    const dispatch = useDispatch();

    return (
        <div className="gameOver">
            <button type="button" className="nes-btn is-error"
                    onClick={() => dispatch({ type: ACTIONS.RESET })}>
                Restart </button>
        </div>
    )
}