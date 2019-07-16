import React from "react";
import Button from "@material-ui/core/Button";

class RestartButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { text: "You Died!" };
    }
    onMouseOver(e) {
        this.setState({ text: "Restart?" });
    }
    onMouseOut(e) {
        this.setState({ text: "You Died!" });
    }
    render() {
        const { text } = this.state;
        return (
            <Button
                className={"button"}
                variant="contained"
                color="secondary"
                onClick={this.props.restartGame}
                onMouseEnter={this.onMouseOver.bind(this)}
                onMouseLeave={this.onMouseOut.bind(this)}>
                {text}
            </Button>
        );
    }
}
export default RestartButton;
