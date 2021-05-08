import { weightedRange } from "../core/utilities";
import { v4 as uuidv4 } from "uuid";

const spriteInitialState = {};

export const sprite = (state = spriteInitialState, action) => {
    switch (action.type) {
        case "SPAWN_SPRITE":
            const initialHealth = weightedRange(
                100,
                150 + 100 * action.level,
                action.level
            );
            const initialPower = weightedRange(
                40,
                50 + 20 * action.level,
                action.level
            );
            return {
                id: uuidv4(),
                power: initialPower,
                health: initialHealth,
                maxHealth: initialHealth,
                level: action.level,
                x: action.x,
                y: action.y,
                name: action.name,
                experience: 0
            };
        case "SET_SPRITE_POSITION":
            if (state.id !== action.id) {
                return state;
            }
            return Object.assign({}, state, { x: action.x, y: action.y });
        case "SET_SPRITE_HEALTH":
            if (state.id !== action.id) {
                return state;
            }
            return Object.assign({}, state, { health: action.health });
        case "SET_SPRITE_POWER":
            if (state.id !== action.id) {
                return state;
            }
            return Object.assign({}, state, { power: action.power });
        case "ATTACK_SPRITE":
            if (state.id !== action.id) {
                return state;
            }
            return Object.assign({}, state, { health: state.health - action.damage });
        case "ADD_EXPERIENCE":
            if (state.id !== action.id) {
                return state;
            }
            const exp = state.experience;
            const expGain = action.experience;
            let newExp = exp + expGain;
            let { level, power, health, maxHealth } = state;
            let levelReq = 50 + level * 50;
            console.log("adding exp:", newExp);
            while (newExp > levelReq) {
                level += 1;
                power *= 1.1;
                health = Math.max(maxHealth, health);
                newExp %= levelReq;
                levelReq = 50 + level * 50;
            }
            return Object.assign({}, state, {
                experience: newExp,
                power: Math.round(power),
                health,
                level
            });
        default:
            return state;
    }
};

const spritesInitialState = [];
export const spritesReducer = (state = spritesInitialState, action) => {
    switch (action.type) {
        case "RESET_DATA":
            return spritesInitialState;
        case "SPAWN_SPRITE":
            return [...state, sprite(undefined, action)];
        case "DESTROY_SPRITE":
            return [...state.filter(e => e.id !== action.id)];
        case "ATTACK_SPRITE":
            return state.map(e => sprite(e, action));
        case "SET_SPRITE_POSITION":
            return state.map(e => sprite(e, action));
        case "SET_SPRITE_HEALTH":
            return state.map(e => sprite(e, action));
        case "SET_SPRITE_POWER":
            return state.map(e => sprite(e, action));
        case "ADD_EXPERIENCE":
            return state.map(e => sprite(e, action));
        default:
            return state;
    }
};

export default sprite;
