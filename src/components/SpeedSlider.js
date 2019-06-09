import React from 'react';
import Slider from 'material-ui-slider-label/Slider/Slider';
// import Slider from 'material-ui/Slider'
import { cyan500 } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class SpeedSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            speed: 500
        };
        this.styles = {
            subheader: {
              textTransform: 'capitalize',
              fontSize: '20px',
              marginBottom: '50px',
            },
            labelStyleOuter: {
              width: '30px',
              height: '30px',
              borderRadius: '50% 50% 50% 0',
              background: cyan500,
              position: 'absolute',
              transform: 'rotate(-45deg)',
              top: '-40px',
              left: '-9px',
            },
            labelStyleInner: {
              transform: 'rotate(45deg)',
              color: 'white',
              textAlign: 'center',
              position: 'relative',
              top: '9px',
              right: '0px',
              left: '0px',
              fontSize: '10px',
            },
          };
    }
    setSpeed = (s) => {
        this.setState({
            speed: s,
        });
    }
    handleSlider = (event, value) => {
        this.setSpeed(value);
        this.props.handleChange(value);
      };
    render() {
        return <React.Fragment>
            <MuiThemeProvider>
                <h1 style={this.styles.subheader}>
                    Tick Speed (Ms)
                </h1>
                <Slider
                    min={200}
                    max={2000}
                    step={100}
                    value={this.state.speed}
                    onChange={this.handleSlider}
                    label={
                        <div style={this.styles.labelStyleOuter}>
                            <div style={this.styles.labelStyleInner}>
                                {this.state.speed}
                            </div>
                        </div>
                    }
                />
            </MuiThemeProvider>
        </React.Fragment>;
    }
}

export default SpeedSlider;