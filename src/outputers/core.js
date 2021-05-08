import React, { Component } from 'react';
import Map from '../components/map';
import Enemies from '../components/enemies';
import Player from '../components/player';
import Const from '../constants/settings';
import camMove from "../core/camMove";

class Core extends Component {
    constructor(props) {
        super(props);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    centerOn(x, y) {
        let w = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName('body')[0],
            windowX = w.innerWidth || e.clientWidth || g.clientWidth,
            windowY = w.innerHeight || e.clientHeight || g.clientHeight;

        this.props.setScreen({
            left: (windowX / 2 - x * Const.UNIT_WIDTH),
            top: (windowY / 2 - y * Const.UNIT_HEIGHT),
        })
    }

    centerOnPlayer() {
        const {x, y} = this.props.player;
        this.centerOn(
            x,
            y
        );
    }

    movePlayer(x, y) {
        const { tiles, player } = this.props;

        if (tiles[x][y].type !== 'wall') {
            this.centerOn(x, y);
            return this.props.moveSprite(player.id, x, y);
        }
    }

    handleSwipe(direction) {
        let {x, y} = this.props.player;

        switch (direction) {
            case 'left':
                x -= 1;
                break
            case 'right':
                x += 1;
                break;
            case 'up':
                y -= 1;
                break;
            case 'down':
                y += 1;
                break;
            default:
                return;
        }
        this.movePlayer(x, y);
    }

    handleKeyPress(e) {
        const key = e.which;
        if (key >= 37 && key <= 40) { e.preventDefault(); }
        let {x, y} = this.props.player;
        switch (key) {
            case 87:
            case 38:
                y -= 1;
                break;
            case 83:
            case 40:
                y += 1;
                break;
            case 65:
            case 37:
                x -= 1;
                break;
            case 68:
            case 39:
                x += 1;
                break;
            default:
                return;
        }
        this.movePlayer(x, y);
    }

    componentWillMount() {
        const {x, y} = this.setupGame(this.props.rooms);
        this.centerOn(x, y);
    }

    componentDidMount() {
        camMove(window, this.handleSwipe.bind(this));
        window.addEventListener("keydown", this.handleKeyPress.bind(this));
        window.onresize = this.centerOnPlayer.bind(this);
    }

    render() {
        return (
            <div>
                <div
                    style={{
                        left: `35px`,
                        top: `35px`,
                        position: 'fixed'
                    }}>
                    <Map />
                    <Player />
                    <Enemies />
                </div>
            </div>
        );
    }
}

export default Core;