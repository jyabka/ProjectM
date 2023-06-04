const minHpRegen = 10;
const maxHpRegen = 40;

export const entitiesTypes = {
  player: {
    tile: "PLAYER_TILE",
    healthRegen: minHpRegen + Math.floor(Math.random() * (maxHpRegen - minHpRegen)),
    health: 20,
    dmg: 4,
    score: 0,
    fightingWith: null
  },
  enemy: {
    tile: "ENEMY_TILE",
    id: 0,
    health: 20,
    dmg: 0,
  }
}
