import React from 'react';
import './fightWindow.css'
import '../../node_modules/nes.css/css/nes.css'

export default function FightWindow() {
    
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
      </div>
    );
}