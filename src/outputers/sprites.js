import React from 'react';
import Const from '../constants/settings'
import './sprites.css';

const Sprite = ({ name, level, health, maxHealth, x, y }) => {
    const width = Const.UNIT_WIDTH;
    const height = Const.UNIT_HEIGHT;
    const style = {
        position: 'absolute',
        left: x * width,
        top: y * height,
        width: width,
        height: height,
        opacity: (0.3+health/maxHealth)
    }

    return (
        <div
            className={`sprite ${name}-${level}`}
            style={style}>
        </div>
    );
};

export default Sprite;