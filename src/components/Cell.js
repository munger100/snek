import React from "react";

const Cell = props => {
    return <div className={props.head ? "head" : props.alive ? "alive " : "dead"} />;
};

export default Cell;
