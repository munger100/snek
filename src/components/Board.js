import React from 'react';
import Cell from './Cell';
import { DropDownMenu } from 'material-ui';
class Board extends React.Component {
    constructor(props) {
        super(props);
        const {live, cells, size, direction, last_dir, head, snake, treatCount, treat, score, scoreToWin, speed} = this.props.state;
        this.score_to_win = size*size;
        const init_state = {
            cells,
            direction,
            size,
            head,
            snake,
            treatCount,
            treat,
            score,
            scoreToWin,
            live,
            speed,
        }
        this.treatGrid = this.initTreatGrid(size);
        this.state = init_state;
        this.timer = setInterval(this.tick, this.state.speed);
    };

    handleCellTap(direction, cell) {
        let dir = this.state.direction;
        switch (direction) {
            case 'u':       
                if (dir !== "d") {
                    dir = "u";
                }
                break;
            case 'l':
                if (dir !== "r") {
                    dir = "l";
                }
                break;
            case 'd':
                if (dir !== "u") {
                    dir = "d";
                }
                break;
            case 'r':
                if (dir !== "l") {
                    dir = "r";
                }
                break;
            default:
                break;
        }
        this.props.changeDirection(dir);
    }
     
    pickFromTreatGrid = (grid) => {
        const available = grid.filter(entry => !this.state.snake.includes(entry));
        return available[Math.floor(Math.random() * available.length)];
    }
    initTreatGrid = (size) => {
        const grid = [];
        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                grid.push([x, y]);
            }
        }
        return grid;
    }
    feedCells() {
        const {cells} = this.state;
        if (cells === null) {
            return "Cells Null";
        }
        const to_display = [];
        for (let y=0; y < cells.length; y++) {
            for (let x = 0; x < cells[y].length; x++) {
                to_display.push(this.newCell(cells[y][x].alive, x, y));
            }
        }
        return to_display;
    };
    tick = () => {
        const sameState = Object.keys(this.state).map((key) => this.state[key] === this.props.state[key])
            .every(x => !!x);
        if (!sameState) {
            const temp_state = {};
            Object.keys(this.state).forEach((key) => temp_state[key] = this.props.state[key]);
            clearInterval(this.timer);
            this.timer = setInterval(this.tick, temp_state.speed);
            this.setState(temp_state);
        } 
        if (this.state.live) {
            this.calculateStep();
        }
    };
    getDirFromCellTap(x, y, dir, s) {
        if (y === 0 || y === 8) dir = (y === 0 ? "u" : "d");
        else if (y === 1 || y === 7) {
            if (x === 0) dir = "l";
            else if (x === s) dir = "r";
            else dir = (y === 1 ? "u" : "d");
        } else if (y === 2 || y === 6) {
            if (x < 2) dir = "l";
            else if (x >= s - 2) dir = "r";
            else dir = (y === 2 ? "u" : "d");
        }  else if (y === 3 || y === 5) {
            if (x < 4) dir = "l";
            else if (x === 4) dir = (y === 3 ? "u" : "d");
            else dir = "r";
        } else if (y === 4) {
            if (x < 4) dir = 'l';
            else if (x > 4) {
                dir = "r";
            }
        }
        return dir;
    }
    newCell = (alive, x, y, str="") => {
        const is_head = this.props.state.head[0] === x && this.props.state.head[1] === y;
        return <Cell head={is_head} alive={alive} key={`${x} ${y}`} />
    }

    calculateStep = () => {
        const {cells, direction, head, snake, treat, treatCount, score, scoreToWin: score_to_win, size} = this.state;
        
        if (score === score_to_win) {
            console.log("YOU WON WOAH");
            this.props.handleWin();
            return this.props.toggle();
        } 
        
        let increment = false;
        let t;
        let tc;
        if (treatCount === 0) {
            const arr = this.pickFromTreatGrid(this.treatGrid);
            t = [...arr];
            increment = true;
        } else {
            t = [...treat];
        }
        if (this.props.state.restartFlag) {
            this.props.setGameState(null, t);
        } 
    
        // get new x, y
        let x, y;
        switch (direction) {
            case "r":
                x = head[0] + 1;
                y = head[1];
                break;
            case "l":
                x = head[0] - 1;
                y = head[1];
                break;
            case "u":
                x = head[0];
                y = head[1] - 1;
                break;
            case "d":
                x = head[0];
                y = head[1] + 1;
                break;
        }   

        // check new x, y inside board
        if (x < 0 || x >= size || y < 0 || y >= size) {
            return this.die();
        }
        
        // generate new snake and cells
        const new_head = [x, y];

        // Duplicate
        if (snake.some((entry) => entry.every((x, index) => x === new_head[index]))) { 
            return this.die();
        }
        const new_snake = [new_head, ...snake];
        const to_remove = new_snake.pop();
        
        const new_cells = [...cells];
        new_cells[y][x].alive = true;
        let decrement = false;
        if (new_head.every((entry, index) => entry === treat[index])) {
            new_cells[to_remove[1]][to_remove[0]].alive = true;
            new_snake.push(to_remove);
            t = this.pickFromTreatGrid(this.treatGrid);
            this.props.incrementScore();
            // decrement = true;
        } else {
            new_cells[to_remove[1]][to_remove[0]].alive = false;
            if (this.state.score < this.score_to_win) {
                new_cells[treat[1]][treat[0]].alive = true;
            }
        }
        

        // determine treatCount
        if (increment) {
            tc = 1;
        }
        if (decrement) {
            tc = 0;
        }
        
        this.props.setGameState({
            cells: new_cells,
            head: new_head,
            snake: new_snake,
            treatCount: tc,
            treat: t,
            score: new_snake.length,
            last_dir: direction,
        });
        // push to new cells
    };

    die = () => {
        return this.props.toggle();
    };
    hasDuplicates = (arr) => {
        const count = [];
        for (const item in arr) {
            const label = `${item[0]} ${item[1]}`; 
            if (count[label] !== null) {
                count[label] += 1;
            } else {
                count[label] = 1;
            } 
        }
        return count.some((i) => i > 1);
    }
    render() {
        return <React.Fragment>
                <div className="board" style={{height: 30*this.props.state.size, width: 30*this.props.state.size}}>
                    {this.feedCells()}
                </div>
        </React.Fragment>;
    }
}

export default Board;