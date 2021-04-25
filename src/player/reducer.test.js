import reducer, { getNextPosition, borderObserver, DIRECTIONS, MOVE_CH, initialState } from './reducer';
import {SCREEN_WIDTH,SCREEN_HEIGHT, SPRITE_SIZE } from '../configs/settings'


test('getNextPosition', () => {
    expect(getNextPosition([0, 0], DIRECTIONS.RIGHT)).toEqual([SPRITE_SIZE, 0]);
    expect(getNextPosition([0, 0], DIRECTIONS.LEFT)).toEqual([0, 0]);
    expect(getNextPosition([0, 0], DIRECTIONS.UP)).toEqual([0, 0]);
    expect(getNextPosition([0, 0], DIRECTIONS.DOWN)).toEqual([0, SPRITE_SIZE]);
    expect(getNextPosition([0, 0], undefined)).toEqual([0, 0]);
});

/*test('borderObserver', () => {
    expect(borderObserver([0, 0], [-1, 0])).toEqual([0, 0]);
    expect(borderObserver([0, 0], [SCREEN_WIDTH + 1, 0])).toEqual([0, 0]);
    expect(borderObserver([0, 0], [0, -1])).toEqual([0, 0]);
    expect(borderObserver([0, 0], [0, SCREEN_HEIGHT + 1])).toEqual([0, 0]);
});*/

test('тест экшена MOVE_CH', () => {
    const action = {
        type: MOVE_CH,
        payload: DIRECTIONS.RIGHT
    };

    const newState = reducer(undefined, action);
    expect(newState).toEqual({
        ...initialState,
        position: [initialState.position[0] + SPRITE_SIZE, initialState.position[1]]});

});