import React, { Component } from 'react';

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

class Card extends Component {
    cardName() {
        let isAce = /^a$/i.test(this.props.rank);
        let isCourt = /^[jqk]$/i.test(this.props.rank);
        let rank_name = (isAce || isCourt) ? rankToName[this.props.rank] : this.props.rank;
        let suit_name = suitToName[this.props.suit] + (isCourt ? '2' : '');
        return rank_name + '_of_' + suit_name
    }

    render() {
        return (
            <div className="card">
                <img src={require('./playing-cards/png/' + this.cardName() + '.png')}
                     className="card-image"
                     alt={this.cardName().split('_').join(' ')}
                />
            </div>
        );
    }
}

export default Card;

