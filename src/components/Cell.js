import React from 'react';

const Cell = (props) => {
    if (props.head) {
        console.log('head' + props.x + props.y)
    }
    return <div onClick={() => props.onClick()} className={props.head ? 'head' : props.alive ? "alive " : "dead"}>   
    {props.d}
    </div>
};

export default Cell;