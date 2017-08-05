import React, { Component } from 'react';
import logo from '../logo.svg';
import Game from './BlackjackGame'
import '../stylesheets/App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to Technique Trainer</h2>
                </div>
                <p className="App-intro">
                    Test your skills at Blackjack!
                </p>
                <Game dealerUpCard="k" playerCards={["5", "7"]}/>
            </div>
        );
    }
}

export default App;
