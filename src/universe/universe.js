import React from 'react';
import Map from '../mapgen/map-generator'
import Player from '../player/player'

function Universe(props) {
    return(
        <div>
            <Map />
            <Player />
        </div>
    )
}
export default Universe;
