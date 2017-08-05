import React, { Component } from 'react';
import Hand from './Hand'
import Card from './Card'
import splitTable from '../basic-strategy-tables/splitTable'
import softTable from '../basic-strategy-tables/softTable'
import hardTable from '../basic-strategy-tables/hardTable'
import '../stylesheets/BlackjackGame.css'

const options = {
    sp: 'split',
    h: 'hit',
    NC: 'stand',
    db: 'double (stand)',
    dbN: 'double (hit)'
};

class BlackjackGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dealerUpCard: Card.chooseRank(),
            playerCards: [Card.chooseRank(), Card.chooseRank()]
        }
    }

    componentDidMount() {
        this.setState({
            bestOption: this.findBestOption().toUpperCase()
        })
    }

    findBestOption() {
        let playerHand = this.refs.playerHand;
        let dealerHand = this.refs.dealerHand;
        let dealerUpCard = dealerHand.refs.card1.getValue();
        if (playerHand.isSplit()) {
            let splitCard = playerHand.refs.card1.getValue();
            return options[splitTable[splitCard][dealerUpCard]]
        }
        let isSoftHand = playerHand.isSoft();
        let table = (isSoftHand) ? softTable : hardTable;
        let playerHandTotal = playerHand.total();
        if (isSoftHand) {
            if (playerHandTotal > 20) { playerHandTotal = 20; }
        } else {
            if (playerHandTotal > 17) { playerHandTotal = 17; }
            else if (playerHandTotal < 7) { playerHandTotal = 7; }
        }
        console.log(dealerUpCard);
        console.log(playerHandTotal);
        return options[table[playerHandTotal][dealerUpCard]]
    }

    render() {
        return (
            <div className="BlackjackGame">
                <div>
                    <Hand ref="dealerHand" cards={[this.state.dealerUpCard, 'x']}/>
                    <Hand ref="playerHand" cards={[this.state.playerCards[0], this.state.playerCards[1]]}/>
                </div>
                <div>
                    <p>In this situation, it's best to</p>
                    <h3>{this.state.bestOption}</h3>
                </div>
            </div>
        )
    }
}

export default BlackjackGame
