export const ACTIONS = {
    MOVE_CH: 'MOVE_CH',
    FIGHT_ACTION: 'FIGHT_ACTION',
    HEAL_ACTION: 'DEFEND_ACTION',
    RESET: 'RESET',
    NEXT_LEVEL: 'NEXT_LEVEL'
};

export const FIGHT_VARIANTS = {
    ATTACK: 'ATTACK',
    DEFEND: 'DEFEND',
    PARRY: 'PARRY',
    RUNNING: 'RUNNING'
};

export const GAME_STATUS = {
    PLAYER_WANDER: 2,
    PLAYER_FIGHTING: 1,
    PLAYER_DIED: 0
};