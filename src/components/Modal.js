import React from 'react';
import '../style/modal.css';

class Modal extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const visible = this.props.show ? `show` : `hide`;
        return (<div className={`modal ${visible}`}>
            <div class="modal-content">
                <span onClick={() => this.props.closeWin()} ref="closeModal" class="close">&times;</span>
                <p>You have beat the game, and I am very impressed. <br/> You're an absolute legend and the world loves you.</p>
            </div>
        </div>);
    }
}

export default Modal;