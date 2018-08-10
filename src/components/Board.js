import React from 'react';
import Cell from './Cell';


const Board = (props) => {
    const cells = [];
    const generateCells = () => {
        for (let i = 0; i < 100; i++) {
            cells.push(<Cell />);
        }
    };
    generateCells();
    return <div className="board">
        {cells}
    </div>
}

export default Board;