import React from 'react';
import Cell from './Cell';
import Swipe from 'react-easy-swipe';

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.size = 9;
        this.swipe_direction = "u";
        const init_state = {
            cells: this.initCells(this.size),
            direction: "r",
            last_dir: "r",
            head: [0, 0],
            snake: [[0, 0]],
            treatCount: 1,
            treat: [Math.floor(Math.random()*this.size), Math.floor(Math.random()*(this.size - 1) + 1)],
        }
        this.treatGrid = this.initTreatGrid(this.size);
        this.state = init_state;
        this.timer = setInterval(this.tick, 500);
    };

    handleTap(direction, cell) { 
        let dir = this.state.direction;
        switch (direction) {
            case 'u':       
                if (dir != "d") {
                    dir = "u";
                }
                break;
            case 'l':
                if (dir != "r") {
                    dir = "l";
                }
                break;
            case 'd':
                if (dir != "u") {
                    dir = "d";
                }
                break;
            case 'r':
                if (dir != "l") {
                    dir = "r";
                }
                break;
        }
        console.log("Tapped " + dir)
        this.setState({direction: dir});
    }
     
    onKeyPressed(e) {
        const {last_dir} = this.state; // last_dir prevents snake from flipping 180 degrees, which would kill.
        var dir = this.state.direction;
        switch (e.which) {
            case 87:       
                if (dir != "d" && last_dir != "d") {
                    dir = "u";
                }
                break;
            case 65:
                if (dir != "r" && last_dir != "r") {
                    dir = "l";
                }
                break;
            case 83:
                if (dir != "u" && last_dir != "u") {
                    dir = "d";
                }
                break;
            case 68:
                if (dir != "l" && last_dir != "l") {
                    dir = "r";
                }
                break;
        }
        this.setState({direction: dir});
    }
    pickFromTreatGrid = (grid) => {
        const available = grid.filter(entry => !this.state.snake.includes(entry));
        return available[Math.floor(Math.random() * available.length)];
    }
    initTreatGrid = (size) => {
        const grid = [];
        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                grid.push([x, y])
            }
        }
        return grid;
    }
    initCells = (l, blank=false) => {
        const cells = [];
        for (let y = 0; y < l; y++) {
            cells.push([]);
            for (let x = 0; x < l; x++) {
                cells[y].push({alive: (x === 0 && y === 0 && !blank), x, y})
            }
        }
        return cells;
    };
    feedCells(state) {
        const to_display = [];
        if (state.cells == null) {
            return "Cells Null";
        }
        for (let y=0; y < state.cells.length; y++) {
            for (let x = 0; x < state.cells[y].length; x++) {
                to_display.push(this.newCell(state.cells[y][x].alive, x, y));
            }
        }
        console.log("cells fed")
        return to_display;
    };
    tick = () => {
        if (this.props.live) {
            this.calculateStep(this.state)
        }
    };
    getDirFromCellTap(x, y, dir, s) {
        if (y == 0 || y == 8) dir = (y == 0 ? "u" : "d");
        else if (y == 1 || y == 7) {
            if (x == 0) dir = "l";
            else if (x == s) dir = "r";
            else dir = (y == 1 ? "u" : "d");
        } else if (y == 2 || y == 6) {
            if (x < 2) dir = "l";
            else if (x >= s - 2) dir = "r";
            else dir = (y == 2 ? "u" : "d");
        }  else if (y == 3 || y == 5) {
            if (x < 4) dir = "l";
            else if (x == 4) dir = (y == 3 ? "u" : "d");
            else dir = "r";
        } else if (y == 4) {
            if (x < 4) dir = 'l';
            else if (x > 4) {
                dir = "r";
            }
        }
        return dir;
    }
    newCell = (alive, x, y, str="") => {
        let dir = this.getDirFromCellTap(x, y, this.state.direction, this.size);
        return <Cell onClick={() => this.handleTap(dir)} alive={alive} key={`${x} ${y}`} ></Cell>
    }
    
    calculateStep = (state) => {
        const {cells, direction, head, snake, treat, treatCount} = state;
        let increment = false;
        let t;
        let tc;
        if (treatCount == 0) {
            console.log("spawning treat")
            const arr = this.pickFromTreatGrid(this.treatGrid);
            t = [...arr];
            increment = true;
        } else {
            t = [...treat];
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
        if (x < 0 || x >= this.size || y < 0 || y >= this.size) {
            console.log("should die")
            return this.die();
        }
        
        // generate new snake and cells
        const new_head = [x, y];

        // Duplicate
        if (snake.some((entry) => entry.every((x, index) => x == new_head[index]))) { 
            return this.die();
        }
        const new_snake = [new_head, ...snake];
        const to_remove = new_snake.pop();
        
        const new_cells = [...cells];
        new_cells[y][x].alive = true;
        let decrement = false;
        if (new_head.every((entry, index) => entry === treat[index])) {
            console.log("GROW 1")
            new_cells[to_remove[1]][to_remove[0]].alive = true;
            new_snake.push(to_remove);
            t = this.pickFromTreatGrid(this.treatGrid);
            // decrement = true;
        } else {
            new_cells[to_remove[1]][to_remove[0]].alive = false;
            new_cells[treat[1]][treat[0]].alive = true;
        }
        

        // determine treatCount
        if (increment) {
            tc = 1;
        }
        if (decrement) {
            tc = 0;
        }
        
        if (new_snake.length == this.size**2) {
            console.log("YOU WON WOAH")
        }

        // push to new cells
        this.setState({
            cells: new_cells,
            head: new_head,
            snake: new_snake,
            treatCount: tc,
            treat: t,
            last_dir: direction,
        });
    };

    die = () => {
        console.log("dead");
        this.props.toggle();
        return this.setState(this.init_state); 
    };
    hasDuplicates = (arr) => {
        const count = [];
        for (const item in arr) {
            const label = `${item[0]} ${item[1]}`; 
            if (count[label] != null) {
                count[label] += 1;
            } else {
                count[label] = 1;
            } 
        }
        return count.some((i) => i > 1);
    }
    componentDidMount() {
        document.addEventListener("keydown", event => this.onKeyPressed(event));
    }
    componentWillUnmount() {
        clearInterval(this.timer);
        document.removeEventListener("keydown", event => this.onKeyPressed(event));
    }
    render() {
        return <React.Fragment>
                <div className="board" style={{height: 30*this.size, width: 30*this.size}}>
                    {this.feedCells(this.state)}
                </div>
        </React.Fragment>;
    }
}

export default Board;