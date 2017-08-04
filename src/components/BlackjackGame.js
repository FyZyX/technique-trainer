import React, { Component } from 'react';
import Hand from './Hand'

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dealerUpCard: 'k',
            playerCards: ['5', '7']
        }
    }

    render() {
        return (
            <div className="BlackjackGame">
                <Hand cards={[this.state.dealerUpCard, 'x']}/>
                <Hand cards={[this.state.playerCards[0], this.state.playerCards[1]]}/>
            </div>
        )
    }
}

export default Game
