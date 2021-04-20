import React from 'react'

// function MapCell(props) {
//     return <div></div>
// }
//
// function MapRow(props) {
//     return props.tiles.map(tiles => <MapCell value={tiles} />);
// }

export default function Map(props) {
    return (
        <div
            style={{
                position: "absolute",
                //backgroundImage: "url(`${mapSprite})",
                border: '3px solid transparent',
                width: "960px",
                height: "640px",
                backgroundColor: "black",
            }}
        >
        </div>
    );
}