import React, { Component } from 'react';
import './stylesheets/Card.css';

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
    static chooseSuit() {
        return suits[Math.floor(Math.random() * suits.length)];
    }

    getValue() {
        if (/^x$/) {
            return 0;
        } else if (/^a$/i.test(this.props.rank)) {
            return 1;
        } else if (/^[jqk]$/i.test(this.props.rank)) {
            return 10;
        } else {
            return parseInt(this.props.rank, 10);
        }
    }

    cardName() {
        if (/^x$/i.test(this.props.rank)) {
            return 'bicycle_rider_back'
        }
        let isAce = /^a$/i.test(this.props.rank);
        let isCourt = /^[jqk]$/i.test(this.props.rank);
        let rank_name = (isAce || isCourt) ? rankToName[this.props.rank] : this.props.rank;
        let suit_name = suitToName[this.props.suit] + (isCourt ? '2' : '');
        return rank_name + '_of_' + suit_name
    }

    render() {
        return (
            <div className="Card">
                <img src={require('./playing-cards/png/' + this.cardName() + '.png')}
                     className="Card-image"
                     alt={this.cardName().split('_').join(' ')}
                />
            </div>
        );
    }
}

export default Card;

