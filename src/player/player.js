import React from 'react'
import {connect} from 'react-redux'
import Movement from './movement'
import playerSprite from './player_sprite.png'

function Player({ position }) {
    return (
        <div
            style={{
            position:"absolute",
            width:"32px",
            height:"32px",
            top: position[1],
            left: position[0],
            //backgroundColor:"black",
            backgroundImage: `url('${playerSprite}')`
            //backgroundPosition: '0 0',
            //backgroundRepeatwidth: '20px',
        }}
        />
    )
}

function mapStateToProps(state){
    return {
        ...state.player
    }
}

export default connect(mapStateToProps)(Movement(Player))