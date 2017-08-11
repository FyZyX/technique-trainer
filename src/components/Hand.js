import React, { Component } from 'react';
import Card from './Card'
import CardSelector from './CardSelector'
import '../stylesheets/Hand.css';

/**
 * Simple abstraction of a blackjack hand that contains two cards
 * These cards are selectable via a keypad-like interface
 */
export class Hand extends Component {
    /**
     * Helper method to determine if the cards are the same
     *
     * @param cards: array of strings representing the cards' rank (e.g. ["3", "k"])
     * @returns {boolean} true iff the hand can be split (i.e. both cards have the same rank)
     */
    static isSplit(cards) {
        return cards[0] === cards[1]
    }

    /**
     * Helper method to determine if there is an ace
     *
     * @param cards: array of strings representing the cards' rank (e.g. ["3", "k"])
     * @returns {boolean} true iff the hand is soft (i.e. contains an ace)
     */
    static isSoft(cards) {
        return cards.includes('a')
    }

    /**
     * Helper method to determine the total value of a hand
     *
     * @returns {number} the sum of the values of the cards in the hand
     */
    total() {
        return this.refs.card1.getValue() + this.refs.card2.getValue()
    }

    /**
     * Helper method to determine if both cards have been selected
     *
     * @param cards: array of strings representing the cards' rank (e.g. ["3", "k"])
     * @returns {boolean} true iff no card in the hand contain a null value
     */
    static isSelected(cards) {
        return !cards.includes(null)
    }

    /**
     * Renders a card selector if the card has not been chosen yet,
     * otherwise renders the chosen card
     *
     * @param props: dictionary to identify the sender
     *               (e.g. the first card in the dealer's hand would be {cardNumber: 1, type="dealer"})
     * @returns {XML} CardSelector or Card depending on whether or not a card has been selected
     */
    renderCard(props) {
        // Remember, `cardNumber` is always 1 more than the corresponding index
        let rank = this.props.cards[props.cardNumber - 1];
        if (rank === null) {  // Card not yet selected
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
                {this.renderCard({cardNumber: 1, type: this.props.type})}
                {this.renderCard({cardNumber: 2, type: this.props.type})}
            </div>
        );
    }
}

/**
 * Stubbed out component to simplify computation on the dealer hand
 * For this exercise the dealer will always have one face down card
 */
export class DealerHand extends Hand {
    // TODO: Implement
}
