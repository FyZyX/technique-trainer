import React, { Component } from 'react';
import logo from '../logo.svg';
import Game from './BlackjackGame'
import Controller from './Controller';
import '../stylesheets/App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Controller />
            </div>
        );
    }
}

export default App;
