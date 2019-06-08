import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import React from 'react';
import Board from './Board';

class Game extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {
            live: false
        }
    };
    
    toggleState = () => {
        this.setState({
            live: !this.state.live,
        });
    }

    render() {
        return (
            <div className={"container"}>
                <Card>
                    <CardContent>
                        <Board live={this.state.live} toggle={() => this.toggleState()}/>
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" color="primary" onClick={() => this.toggleState()}> {this.state.live ? "Stop" : "Start"} </Button>
                    </CardActions>
                </Card>
            </div>
        );
    }
    /*
    render() {
        return (<div>
            <Card >
                <CardContent>
                    <Board live={this.state.live} toggle={this.toggleState()}/>\
                </CardContent>
                <CardActions>
                    <Button variant="contained" color="primary" onClick={() => this.toggleState()}> {this.state.live ? "Stop" : "Start"} </Button>
                </CardActions>
            </Card>
        </div>);
    }
    */
}

export default Game;