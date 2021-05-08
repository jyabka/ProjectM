import React from 'react';
import Sprite from './sprites';

const SpritesSet = ({ sprites }) => {
    let spriteComponents = sprites.map((sprite, idx) => (
        <Sprite
            key={idx}
            {...sprite} />
    ));

    return (
        <div>
            {spriteComponents}
        </div>
    );
};

export default SpritesSet;

