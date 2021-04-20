import React from 'react'
import {connect} from 'react-redux'
import Movement from './movement'

function Player({ position }) {
    return (
        <div
            style={{
                position:"relative",
                width:"20px",
                height:"20px",
                // top: position[1],
                // left: position[0],
                backgroundColor:"black"
                //backgroundImage: 'url(`${playerSprite})'
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