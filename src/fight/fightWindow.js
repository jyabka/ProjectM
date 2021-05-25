import React from 'react';
import './fightWindow.css';

export default function FightWindow() {
    return (
        <div className="fightWindow">
            <button id ="bth1" text="Attack"/>
            <button id ="bth2" text="Defend"/>
            <button id= "bth3" text="Inventory"/>
        </div>
    )
}