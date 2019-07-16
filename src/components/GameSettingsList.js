import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import TimeIcon from "../icons/baseline-timer.svg";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import SpeedSlider from "./SpeedSlider";

class GameSettingsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }
    handleClick = () => {
        this.setOpen(!this.state.open);
    };
    setOpen = bool => {
        this.setState({
            open: bool,
        });
    };
    render() {
        return (
            <List aria-labelledby="nested-list-subheader">
                <ListItem button onClick={this.handleClick}>
                    <ListItemIcon>
                        <img src={TimeIcon} alt="t" />
                    </ListItemIcon>
                    <ListItemText primary="Tick Speed (ms)" />
                    {this.state.open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <List disablePadding>
                        <ListItem style={{ paddingLeft: "4px" }}>
                            <ListItemText>
                                <SpeedSlider handleChange={this.props.handleChange} />
                            </ListItemText>
                        </ListItem>
                    </List>
                </Collapse>
            </List>
        );
    }
}

export default GameSettingsList;
