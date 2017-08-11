import React, { Component } from 'react';
import { randomItem } from '../utils'
import '../stylesheets/Card.css';

const rankToName = {
    a: 'ace',
    j: 'jack',
    q: 'queen',
    k: 'king'
};

const suitToName = {
    c: 'clubs',
    d: 'diamonds',
    h: 'hearts',
    s: 'spades'
};

const suits = Object.keys(suitToName);

class Card extends Component {
    constructor(props) {
        super(props);
        this.suit = Card.chooseSuit()
    }

    static chooseSuit() {
        return randomItem(suits);
    }

    static chooseRank() {
        return randomItem(['a', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k']);
    }

    static valueOf(rank) {
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

    getValue() {
        Card.valueOf(this.props.rank)
    }

    cardName() {
        if (/^x$/i.test(this.props.rank)) {
            return 'bicycle_rider_back'
        }
        let isAce = /^a$/i.test(this.props.rank);
        let isCourt = /^[jqk]$/i.test(this.props.rank);
        let rank_name = (isAce || isCourt) ? rankToName[this.props.rank] : this.props.rank;
        let suit_name = suitToName[this.suit] + (isCourt ? '2' : '');
        return rank_name + '_of_' + suit_name
    }

    render() {
        return (
            <img src={require('../playing-cards/png/' + this.cardName() + '.png')}
                 className="Card-image"
                 alt={this.cardName().split('_').join(' ')}
            />
        );
    }
}

export default Card;
