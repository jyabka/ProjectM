import * as t from './action-types';

function addWeapon(payload) {
	return {
		type: t.ADD_WEAPON,
		payload
	};
}

function addXP(payload) {
	return {
		type: t.ADD_XP,
		payload
	};
}

function changePlayerPosition(payload, x, y) {
	return {
		type: t.CHANGE_PLAYER_POSITION,
		x,
		y,
		payload
	};
}
