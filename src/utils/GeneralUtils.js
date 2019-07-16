export const init_state = obj => {
    const { size, scoreToWin } = obj;
    return {
        live: false,
        cells: initCells(size),
        size: size,
        last_dir: "r",
        head: [0, 0],
        snake: [[0, 0]],
        treatCount: 1,
        treat: [Math.floor(Math.random() * size), Math.floor(Math.random() * (size - 1) + 1)],
        score: 1,
        scoreToWin,
        speed: 500,
        direction: "r",
        dead: false,
        restartFlag: false,
    };
};

export const initCells = (l, blank = false) => {
    const cells = [];
    for (let y = 0; y < l; y++) {
        cells.push([]);
        for (let x = 0; x < l; x++) {
            cells[y].push({ alive: x === 0 && y === 0 && !blank, x, y });
        }
    }
    return cells;
};
