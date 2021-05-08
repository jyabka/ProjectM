import React from 'react';
import './tile.css';

export const Tile = ({ texture, orig }) =>  {
    return (
        <td className={ `tile tile-${texture} ${orig}` } />
    );
}

export default Tile