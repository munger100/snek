import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import React from 'react';
import Board from './Board';
import SpeedSlider from './SpeedSlider';

class Game extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {
            live: false,
            score: 1, 
            speed: 500,
            direction: 'r',
        };
    };
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
    
    incrementScore = () => {
        this.setState({
            score: this.state.score + 1,
        });
    }   
    setDirection = (d) => {
        this.setState({
            direction: d,
        });
    }
    directionToString = (d) => {
        switch (d) {
            case 'd':
                return '↓';
            case 'r':
                return '→';
            case 'u':
                return '↑';
            case 'l':
                return '←';
        }
    }


    render() {
        return (
            <div className={"container"}>
                <Card>
                    <CardContent>
                        <Board ref="board" setDirection={this.setDirection}speed={this.state.speed} incrementScore={() => this.incrementScore()} handleWin={() => this.props.handleWin()} live={this.state.live} toggle={() => this.toggleState()}/>
                        <SpeedSlider handleChange={this.handleChange} />
                    </CardContent>
                    <CardActions className={'card-actions'}>
                        <p className={'score-display'}>Score: {this.state.score}</p>
                        <p className={'direction-display'}>Direction: {this.directionToString(this.state.direction)}</p>
                        <Button className={'button'} variant="contained" color="primary" onClick={() => this.toggleState()}> {this.state.live ? "Stop" : "Start"} </Button>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default Game;