import React, { Component } from 'react';
import Card from './Card'
import '../stylesheets/Hand.css';

class Hand extends Component {
    isSplit() {
        return this.props.cards[0] === this.props.cards[1]
    }

    isSoft() {
        return this.props.cards.includes('a')
    }

    total() {
        return this.refs.card1.getValue() + this.refs.card2.getValue()
    }

    render() {
        return (
            <div className="Hand">
                <Card ref="card1" rank={this.props.cards[0]} suit={Card.chooseSuit()}/>
                <Card ref="card2" rank={this.props.cards[1]} suit={Card.chooseSuit()}/>
            </div>
        );
    }
}

export default Hand
