import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Game from "./components/Game";
import './style/global.css';
import Modal from "./components/Modal";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          won: false,
        }
    }
    handleWin = () => {
        this.setState({
          won: true,
        });
    }
    closeWin = () => {
      this.setState({
        won: false,
      });
    }
    render() {
      return (<div>
            <Modal closeWin={() => this.closeWin()} show={this.state.won} />
            <Game handleWin={() => this.handleWin()}/>
        </div>
      );
    }
  }

export default App;
