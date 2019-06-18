import React from 'react';
import '../style/modal.css';

class Modal extends React.Component {
    render() {
        const visible = this.props.show ? `show` : `hide`;
        return (<div className={`modal ${visible}`}>
            <div className="modal-content">
                <span onClick={() => this.props.closeWin()} ref="closeModal" className="close">&times;</span>
                <p>You have beat the game, and I am very impressed. <br/> You're an absolute legend and the world loves you.</p>
            </div>
        </div>);
    }
}

export default Modal;