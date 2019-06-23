import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import React from 'react';
import Board from './Board';
import GameSettingsList from './GameSettingsList';
import * as DirUtil from "../utils/DirectionUtils";
import * as GenUtil from "../utils/GeneralUtils";
import RestartButton from "./RestartButton";
import TouchControls from "./TouchControls";
class Game extends React.Component  {
    constructor(props) {
        super(props);
        this.size = 9;
        this.score_to_win = this.size*this.size;
        this.basic_info = {size: this.size, scoreToWin: this.score_to_win};
        this.state = GenUtil.init_state(this.basic_info);
    };
    setGameState = (state, init=false) => {
        return init ? GenUtil.init_state(this.basic_info) : this.setState(state);
    }
    handleChange = (value) => {
        this.setState({
            speed: value,
        });
    }
    toggleState = () => {
        this.setState({
            live: !this.state.live,
        });
    }
    die = () => {
        this.setState({
            live: false,
            dead: true,
        });
    }
    
    incrementScore = () => {
        this.setState({
            score: this.state.score + 1,
        });
    }   

    onKeyPressed = (e) => {
        const {last_dir} = this.state; // last_dir prevents snake from flipping 180 degrees by switching direction twice in between ticks, which would kill.
        var dir = this.state.direction;
        switch (e.which) {
            case 87:       
                if (dir !== "d" && last_dir !== "d") {
                    dir = "u";
                }
                break;
            case 65:
                if (dir !== "r" && last_dir !== "r") {
                    dir = "l";
                }
                break;
            case 83:
                if (dir !== "u" && last_dir !== "u") {
                    dir = "d";
                }
                break;
            case 68:
                if (dir !== "l" && last_dir !== "l") {
                    dir = "r";
                }
                break;
            default: break;
        }
        this.changeDirection(dir);
    }

    manageTouchControl = (direction) => {
        let dir = DirUtil.handleDirectionChange(direction, this.state);
        this.changeDirection(dir);    
    }

    changeDirection = (d) => {
        this.setState({direction: d});
    }
    restartGame = () => {
        const s = Object.assign({}, GenUtil.init_state(this.basic_info));
        s['dead'] = false;
        s['restartFlag'] = true;
        this.setState(s);
    }
    componentDidMount() {
        document.addEventListener("keydown", event => this.onKeyPressed(event));
    }
    componentWillUnmount() {
        clearInterval(this.timer);
        document.removeEventListener("keydown", event => this.onKeyPressed(event));
    }
    render() {
        return (
            <div className={"container"}>
                <Card stlye={{width: '375px'}}>
                    <CardHeader title={"Snek"} />
                    <CardContent>
                        <Board ref="board" 
                            setGameState={this.setGameState}
                            changeDirection={this.changeDirection} 
                            state={{...this.state}}
                            incrementScore={() => this.incrementScore()} 
                            handleWin={() => this.props.handleWin()} 
                            toggle={this.die}/>
                        <TouchControls setDirection={this.manageTouchControl} />
                        <div style={{display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center'}} >
                            <p className={'score-display'}> Score: {this.state.score}</p>
                            <p className={'direction-display'}> {DirUtil.directionToCharacter(this.state.direction)}</p>
                            {this.state.dead ? 
                                <RestartButton className={'button'} restartGame={this.restartGame} /> :
                                <Button className={'button'} variant="contained" color="primary" onClick={this.toggleState}> {this.state.live ? "Stop" : "Start"} </Button>
                            }
                        </div>
                    </CardContent>
                    <CardActions className={'card-actions'} >
                        
                        <GameSettingsList handleChange={this.handleChange} />
                        
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default Game;