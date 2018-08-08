import React from 'react';
import Cell from './Cell';


const Board = (props) => {
    const cells = [];
    const generateCells = () => {
        for (let i = 0; i < 10; i++) {
            cells.push(<Cell />);
        }
    };
    generateCells();
    return <div>
        {cells}
    </div>
}

export default Board;