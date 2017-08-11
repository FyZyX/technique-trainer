import React, { Component } from 'react';
import Card from './Card'
import CardSelector from './CardSelector'
import '../stylesheets/Hand.css';

export class Hand extends Component {
    static isSplit(cards) {
        return cards[0] === cards[1]
    }

    static isSoft(cards) {
        return cards.includes('a')
    }

    total() {
        return this.refs.card1.getValue() + this.refs.card2.getValue()
    }

    static isSelected(cards) {
        return !cards.includes(null)
    }

    renderCard(props) {
        let rank = this.props.cards[props.cardNumber - 1];
        if (rank === null) {
            return (
                <CardSelector ref={"card" + props.cardNumber}
                              cardNumber={props.cardNumber}
                              type={props.type}
                              callbackParent={this.props.callbackParent}
                />
            )
        } else {
            return (
                <Card ref={"card" + props.cardNumber}
                      rank={rank}
                />
            )
        }
    }

    render() {
        return (
            <div className="Hand">
                {this.renderCard({cardNumber: 1, type: "player"})}
                {this.renderCard({cardNumber: 2, type: "player"})}
            </div>
        );
    }
}

export class DealerHand extends Hand {
    render() {
        return (
            <div className="Hand">
                {this.renderCard({cardNumber: 1, type: "dealer"})}
                {this.renderCard({cardNumber: 2, type: "dealer"})}
            </div>
        );
    }
}
