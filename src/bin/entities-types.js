const min = 20;
const max = 40;

export const entitiesTypes = {
  player: {
    tile: "PLAYER_TILE",
    maxHealth: min + Math.floor(Math.random() * (max - min)),
    health: 20,
    dmg: 4,
    score: 0,
    fightingWith: null
  },
  enemy: {
    tile: "ENEMY_TILE",
    id: 0,
    health: 20,
    dmg: 2,
  }
}
