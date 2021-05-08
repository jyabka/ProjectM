import { connect } from 'react-redux';
import Sprite from '../outputers/sprites';
import Const from '../constants/settings';

const mapStateToProps = (state) => {
    let sprites = state.sprites.filter(sprite =>
        (sprite.health > 0) && (sprite.name === Const.PLAYER)
    )
    return {
        ...sprites[0],
    }
}

export default connect(mapStateToProps)(Sprite);
