import React from 'react';

const Cell = (props) => {
    if (props.head) {
        console.log('head' + props.x + props.y)
    }
    return <div className={props.head ? 'head' : props.alive ? "alive " : "dead"} />   
};

export default Cell;