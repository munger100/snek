import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Board from "./components/Board";
import './style/global.css';

class App extends Component {
  render() {
    return (
      <div>
          <Board />
      </div>
    );
  }
}

export default App;
