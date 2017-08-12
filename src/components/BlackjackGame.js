import React, { Component } from 'react';
import { Hand, DealerHand } from './Hand'
import splitTable from '../basic-strategy-tables/splitTable'
import softTable from '../basic-strategy-tables/softTable'
import hardTable from '../basic-strategy-tables/hardTable'
import '../stylesheets/BlackjackGame.css'

// Legend for translating from strategy tables
const options = {
    sp: 'split',
    h: 'hit',
    NC: 'stand',
    db: 'double (hit)',
    dbN: 'double (stand)'
};

// TODO: Refactor into more logical location
// This isn't a great place for this function to live,
// but for now it is necessary because the `findBestOption` method
// in this component needs to run in the `render` function if we
// want the Advice text (on the right side of the screen) to update
// based on the whether or not the cards have been selected.
/**
 * Ascribes a numerical value for the provided card rank
 * @param rank: string value representing the rank of the playing card
 * @returns {number} the corresponding value of the given rank
 */
function valueOfCard(rank) {
    if (/^x$/.test(rank)) {  // x = face down
        // To conform with the way some of the more abstract logic work,
        // we choose convenient value for face down cards, namely an
        // additive identity
        return 0;
    } else if (/^a$/i.test(rank)) {  // a = ace
        return 11;
    } else if (/^[jqk]$/i.test(rank)) {  // j = jack, q = queen, k = king
        return 10;
    } else {  // number card
        return parseInt(rank, 10);
    }
}

/**
 * This component represents a game of blackjack between two players
 *
 * The component houses two hands: one for the deal and one for the player
 * Each hand is composed of two cards
 *
 * Once all cards have been selected, the component will tell you which strategy
 * is most advantageous in that circumstance
 */
class BlackjackGame extends Component {
    // TODO: Refactor to avoid static methods on Hand
    // This function is called in `render` so we can't use refs to get Hand objects

    constructor(props) {
        super(props);
        this.state = {
            dealerUpCard: null,
            playerCards: [null, null]
        }
    }

    /**
     * Checks to see if all of the cards have been selected
     *
     * @returns {boolean} true iff all cards have a non-nell value
     */
    isGameReady() {
        // TODO: Create `DealerHand.isSelected`
        return Hand.isSelected(this.state.playerCards) && Hand.isSelected([this.state.dealerUpCard, "x"])
    }

    /**
     * Utilizes the strategy charts to provide the best decision for given game state
     * If all cards haven't been selected this value will be `null`
     *
     * @returns {string | null} one of the `options` (e.g. 'hit', 'stand', etc.)
     */
    findBestOption() {
        if (!this.isGameReady()) {  // Some cards still need to be selected
            return null;
        }

        let dealerUpCard = valueOfCard(this.state.dealerUpCard);
        // TODO: Move this addition logic into a method on Hand
        let playerHandTotal = valueOfCard(this.state.playerCards[0]) + valueOfCard(this.state.playerCards[1]);
        console.log(dealerUpCard);
        console.log(playerHandTotal);

        // ========================= SPLIT HANDS =========================
        // This needs to be handled a little differently because the table
        // doesn't index by hand total, but rather by the value of repeated card
        if (Hand.isSplit(this.state.playerCards)) {  // Can the hand be split?
            let splitCard = valueOfCard(this.state.playerCards[0]);
            return options[splitTable[splitCard][dealerUpCard]]
        }

        // Now let's make sure we're using the right table
        let isSoftHand = Hand.isSoft(this.state.playerCards);
        let table = (isSoftHand) ? softTable : hardTable;

        // ========================= SOFT HANDS =========================
        if (isSoftHand) {  // Is there an ace?
            // Hand totals above 20 have equivalent behavior to 20
            if (playerHandTotal > 20) { playerHandTotal = 20; }
        }
        // ========================= HARD HANDS =========================
        else {
            // Hand totals above 17 have equivalent behavior to 17
            if (playerHandTotal > 17) { playerHandTotal = 17; }
            // Hand totals below 7 have equivalent behavior to 7
            else if (playerHandTotal < 7) { playerHandTotal = 7; }
        }

        // Tables are arranged as two-dimensional dictionaries
        // The `options` dictionary just translates the shorthand
        return options[table[playerHandTotal][dealerUpCard]]
    }

    /**
     * Event handler for when a card is selected
     *
     * @param selectedCard: string containing the rank of the selected card
     * @param type: string to designate the role of the hand in the game ("player" or "dealer")
     * @param cardNumber: number (1 or 2) to designate which card emitted the event
     */
    onCardSelected(selectedCard, type, cardNumber) {
        // Note that both `type` and `cardNumber` serve only to identify the sender
        if (type === "player") {
            // Create a temporary variable to store changes to state
            let newCards = this.state.playerCards;
            // The cards are numbered 1 and 2, so we can simply shift the value to index into the cards array
            // (i.e. card 1 is at index 0, card 2 is at index 1)
            newCards[cardNumber - 1] = selectedCard;

            // Update the state
            this.setState({playerCards: newCards});
        } else if (type === "dealer") {
            // Update the state
            this.setState({dealerUpCard: selectedCard});
        }
    }

    /**
     * Resets the state of the game so that all cards are not selected
     */
    onReset() {
      this.setState({
        dealerUpCard: null,
        playerCards: [null, null]
      })
    }

    /**
     * Renders the best strategy if all of the cards are selected,
     * otherwise prompts the user to select cards
     *
     * @returns {XML} a simple component to be composed in `render`
     */
    renderAdvice() {
        // TODO: Find a better place to put this check (lifecycle method?)
        // Every time state updates we need to recalculate the best option
        let bestOption = this.findBestOption();

        if (bestOption === null) {  // Cards have not been selected
            return (
                <div>
                    <p>Test out a hand by selecting the cards!</p>
                </div>
            )
        }

        // TODO: Create an Advice component to store this markup
        return (
            <div className="advice">
                <p>In this situation, it's best to</p>
                <h3>{bestOption.toUpperCase()}</h3>
                <button onClick={this.onReset.bind(this)}>Reset</button>
            </div>
        )
    }

    render() {
        return (
            <div className="BlackjackGame">
                <div>
                    <DealerHand ref="dealerHand"
                                cards={[this.state.dealerUpCard, "x"]}
                                type="dealer"
                                callbackParent={this.onCardSelected.bind(this)}
                    />
                    <div className="spacer"/>
                    <Hand ref="playerHand"
                          cards={[this.state.playerCards[0], this.state.playerCards[1]]}
                          type="player"
                          callbackParent={this.onCardSelected.bind(this)}
                    />
                </div>
                {this.renderAdvice()}
            </div>
        )
    }
}

export default BlackjackGame

