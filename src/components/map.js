import { connect } from 'react-redux';
import Grid from '../outputers/grid';

const mapStateToProps = (state) => {
    return {
        tiles: state.map.tiles,
    }
}

export default connect(mapStateToProps)(Grid);
