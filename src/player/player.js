import React from 'react'
import { useSelector } from 'react-redux';
import playerSprite from './player_sprite.png'

function Player() {
    const position = useSelector(state => state.player.position);
    console.log(position);
    
    return (
        <div
            style={{
            position:"relative",
            width:"32px",
            height:"32px",
            //backgroundColor:"black",
            backgroundImage: `url('${playerSprite}')`
            //backgroundPosition: '0 0',
            //backgroundRepeatwidth: '20px',
        }}
        />
    )
}

export default Player;