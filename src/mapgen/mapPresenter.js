import {PLAYER_TILE, WALL_TILE} from "../configs/settings";
import {useSelector} from "react-redux";

function Cell({cell, cellColumn}) {
    function getClassName(cell) {
        switch (cell) {
            case WALL_TILE: return 'wall';
            case PLAYER_TILE: return 'player';
            default: return 'tunnel';
        }
    }

    return <td className={getClassName(cell)} key={cellColumn}> </td>
}

export default function MapPresenter() {
    const mapField = useSelector(state => state.map.map)
    return(
        <div>
            <table className="grid">
                <thead>
                {mapField.map((obj, row) => <tr key={row}>{obj.map((obj2, col) => <Cell cell={obj2} cellColumn={col}/>)}</tr>)}
                </thead>
            </table>
        </div>
    )
}