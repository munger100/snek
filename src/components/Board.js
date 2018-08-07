import React from 'react';
import Cell from 'Cell';

export default class Board extends React.Component {
    render() {
        return <div>{for (i = 0; i < 10; i++) return <Cell />}</div>
    }
}