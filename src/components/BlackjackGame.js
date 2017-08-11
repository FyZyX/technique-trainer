import React, { Component } from 'react';
import Card from "./Card";
import { Hand, DealerHand } from './Hand'
import splitTable from '../basic-strategy-tables/splitTable'
import softTable from '../basic-strategy-tables/softTable'
import hardTable from '../basic-strategy-tables/hardTable'
import '../stylesheets/BlackjackGame.css'

const options = {
    sp: 'split',
    h: 'hit',
    NC: 'stand',
    db: 'double (hit)',
    dbN: 'double (stand)'
};

function valueOfCard(rank) {
    if (/^x$/.test(rank)) {
        return 0;
    } else if (/^a$/i.test(rank)) {
        return 11;
    } else if (/^[jqk]$/i.test(rank)) {
        return 10;
    } else {
        return parseInt(rank, 10);
    }
}

class BlackjackGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dealerUpCard: null,
            playerCards: [null, null]
        }
    }

    isGameReady() {
        return Hand.isSelected(this.state.playerCards) && Hand.isSelected([this.state.dealerUpCard, "x"])
    }

    findBestOption() {
        if (!this.isGameReady()) {
            return null;
        }
        console.log(Card.valueOf(this.state.playerCards[0]))
        let dealerUpCard = valueOfCard(this.state.dealerUpCard);
        let playerHandTotal = valueOfCard(this.state.playerCards[0]) + Card.valueOf(this.state.playerCards[1]);
        console.log(dealerUpCard);
        console.log(playerHandTotal);
        if (Hand.isSplit(this.state.playerCards)) {
            let splitCard = valueOfCard(this.state.playerCards[0]);
            return options[splitTable[splitCard][dealerUpCard]]
        }
        let isSoftHand = Hand.isSoft(this.state.playerCards);
        let table = (isSoftHand) ? softTable : hardTable;
        if (isSoftHand) {
            if (playerHandTotal > 20) { playerHandTotal = 20; }
        } else {
            if (playerHandTotal > 17) { playerHandTotal = 17; }
            else if (playerHandTotal < 7) { playerHandTotal = 7; }
        }
        return options[table[playerHandTotal][dealerUpCard]]
    }

    onCardSelected(selectedCard, type, cardNumber) {
        if (type === "player") {
            let newCards = this.state.playerCards;
            newCards[cardNumber - 1] = selectedCard;
            this.setState({playerCards: newCards});
        } else if (type === "dealer") {
            this.setState({dealerUpCard: selectedCard});
        }
    }

    renderAdvice() {
        let bestOption = this.findBestOption();

        if (bestOption === null) {
            return (
                <div>
                    <p>Test out a hand by selecting the cards!</p>
                </div>
            )
        }

        return (
            <div>
                <p>In this situation, it's best to</p>
                <h3>{bestOption.toUpperCase()}</h3>
            </div>
        )
    }

    render() {
        return (
            <div className="BlackjackGame">
                <div>
                    <DealerHand ref="dealerHand"
                                cards={[this.state.dealerUpCard, "x"]}
                                callbackParent={this.onCardSelected.bind(this)}
                    />
                    <div className="spacer"></div>
                    <Hand ref="playerHand"
                          cards={[this.state.playerCards[0], this.state.playerCards[1]]}
                          callbackParent={this.onCardSelected.bind(this)}
                    />
                </div>
                {this.renderAdvice()}
            </div>
        )
    }
}

export default BlackjackGame

