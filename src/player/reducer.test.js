test('getNextPosition', () => {
    expect(getNextPosition([0, 0], DIRECTIONS.RIGHT)).toEqual([1, 0]);
    expect(getNextPosition([0, 0], DIRECTIONS.RIGHT)).toEqual([1, 0]);
    expect(getNextPosition([0, 0], DIRECTIONS.RIGHT)).toEqual([1, 0]);
    expect(getNextPosition([0, 0], DIRECTIONS.RIGHT)).toEqual([1, 0]);
});

test('boderObserver', () => {
    expect(borderObserver([0, 0], [-1, 0])).toEqual([0, 0]);
});