import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Game from "./components/Game";
import './style/global.css';

class App extends Component {
  render() {
    return (
      <div>
          <Game />
      </div>
    );
  }
}

export default App;
