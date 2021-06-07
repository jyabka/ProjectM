export function selectFightingMob(state) {
    const mobId = state.map.player.fightingWith;
    return state.map.mobs.find(mob => mob.id === mobId);
}

export function selectPlayer(state) {
    return state.map.player;
}
