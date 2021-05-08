import { connect } from 'react-redux';
import Const from '../constants/settings';
import SpritesSet from "../outputers/spritesSet";

const mapStateToProps = (state) => {
    let sprites = state.sprites.filter(sprite =>
        (sprite.health > 0) && (sprite.name === Const.ENEMY)
    )
    return {
        sprites: sprites,
    }
}

export default connect(mapStateToProps)(SpritesSet);
