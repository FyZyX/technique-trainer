import React, { Component } from 'react';
import Game from './BlackjackGame';
import logo from '../logo.svg';

/**
 * This component represents the mode select screen
 */
class Controller extends Component {
    constructor(props) {
        super(props);
        this.state = {
            choice: null //play game or practice?
        }
    }

    setPlay(){
        this.setState({
            choice: "play"
        }) // Sets state to "play"
    }
    setPractice(){
        this.setState({
            choice: "practice"
        }) // Sets state to "practice"
    }
        render() { // Renders the game for the selected mode

                if (this.state.choice === null){ return(<div className={"selection"}>

                <button onClick={this.setPlay.bind(this)}>Play Game</button>

                <button onClick={this.setPractice.bind(this)}>Practice</button>
            </div>)
                }
            if (this.state.choice === "practice") {
                return ( <div className="App">
                        <div className="App-header">
                            <img src={logo} className="App-logo" alt="logo"/>
                            <h2>Welcome to Technique Trainer</h2>
                        </div>
                        <p className="App-intro">
                            Test your skills at Blackjack!
                        </p>
                        <Game dealerUpCard="k" playerCards={["5", "7"]}/>
                    </div>
                )
            } else if(this.state.choice === "play"){

            }else { return(<div className={"selection"}>
                "error"
            </div>)}


        }

}

export default Controller;