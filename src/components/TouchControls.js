import React from 'react';

class TouchControls extends React.Component {
    constructor(props) {
        super(props);
    }
    getStyles = () => {
        const dimensions = {
            width: '80px',
            height: '70px',
            margin: 0,
        }
        return {
            cell: {
                ...dimensions,
                border: 'solid black',
            },
            outercorner: {
                ...dimensions,
                border: "none",
            },
            table: {
                height: '240px',
                width: '240px',
                'margin-left': '13%'
            },
            container: {
                height: '260px',
                width: '100%',
                float: 'center',
            }

        }
    }

    handleTap = (d) => {
        this.props.setDirection(d);
    }

    render() {
        return (
            <div style={this.getStyles().container}>
                <table style={this.getStyles().table}>
                    <tbody>
                        <tr>
                            <td style={this.getStyles().outercorner}>&nbsp;</td>
                            <td onClick={() => this.handleTap('u')} style={this.getStyles().cell}>&nbsp;</td>
                            <td style={this.getStyles().outercorner}>&nbsp;</td>
                        </tr>
                        <tr>
                            <td onClick={() => this.handleTap('l')} style={this.getStyles().cell}>&nbsp;</td>
                            <td style={this.getStyles().cell}>&nbsp;</td>
                            <td onClick={() => this.handleTap('r')} style={this.getStyles().cell}>&nbsp;</td>
                        </tr>
                        <tr>
                            <td style={this.getStyles().outercorner}>&nbsp;</td>
                            <td onClick={() => this.handleTap('d')} style={this.getStyles().cell}>&nbsp;</td>
                            <td style={this.getStyles().outercorner}>&nbsp;</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default TouchControls;