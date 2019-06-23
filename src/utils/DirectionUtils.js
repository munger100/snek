export const directionToCharacter = (d) => {
    switch (d) {
        case 'd':
            return ' ↓ ';
        case 'r':
            return '→';
        case 'u':
            return '↑';
        case 'l':
            return '←';
        default: 
            return ' ';
    }
};

export const onKeyPressed = (e) => {
    const {last_dir} = this.state; // last_dir prevents snake from flipping 180 degrees by switching direction twice in between ticks, which would kill.
    var dir = this.state.direction;
    switch (e.which) {
        case 87:       
            if (dir !== "d" && last_dir !== "d") {
                dir = "u";
            }
            break;
        case 65:
            if (dir !== "r" && last_dir !== "r") {
                dir = "l";
            }
            break;
        case 83:
            if (dir !== "u" && last_dir !== "u") {
                dir = "d";
            }
            break;
        case 68:
            if (dir !== "l" && last_dir !== "l") {
                dir = "r";
            }
            break;
        default:
            break;
    }
    this.changeDirection(dir);
}

export const handleDirectionChange = (direction, state) => {
    let {direction: dir, last_dir} = state;
    switch (direction) {
        case 'u':       
            if (last_dir !== "d") {
                dir = "u";
            }
            break;
        case 'l':
            if (last_dir !== "r") {
                dir = "l";
            }
            break;
        case 'd':
            if (last_dir !== "u") {
                dir = "d";
            }
            break;
        case 'r':
            if (last_dir !== "l") {
                dir = "r";
            }
            break;
        default: break;
    }
    return dir;
}