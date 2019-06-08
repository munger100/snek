import React from 'react';

const Cell = (props) => {
    return <div onClick={() => props.onClick()} className={props.alive ? "alive " : "dead"}>   
    {props.d}
    </div>
};

export default Cell;