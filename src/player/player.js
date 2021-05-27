import React from 'react'
import { useSelector } from 'react-redux';

function Player() {
    const position = useSelector(state => state.player.position);
    console.log(position);
    
    return (
        <div
            style={{
            position:"relative",
            width:"32px",
            height:"32px",
        }}
        />
    )
}

export default Player;