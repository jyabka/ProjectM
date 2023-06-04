import { SCREEN_HEIGHT, SCREEN_WIDTH, SPRITE_SIZE } from '../configs/settings'
import { state } from '../store/gameReducer'
const width = SCREEN_WIDTH;
const height = SCREEN_HEIGHT;

const camera = {
  x: 0,
  y: 0,
  width: ~~(width),
  height: ~~(height),
  update() {
    this.x = Math.max(0, player.x - ~~(this.width / 2));
    this.y = Math.max(0, player.y - ~~(this.height / 2));
    this.x = Math.min(this.x, ~~(state.map.length - this.width));
    this.y = Math.min(this.y, ~~(state.map[0].length - this.height));
  }
}
