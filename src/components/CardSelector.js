import React, { Component } from 'react';

import '../stylesheets/CardSelector.css'

class CardSelector extends Component {
    selectCard({ target }) {
        const selectedCard = target.value;
        this.props.callbackParent(selectedCard, this.props.type, this.props.cardNumber)
    }

    renderButton(text) {
        const value = (typeof text === "number") ? text.toString() : text.toLowerCase()[0];
        return (
            <button value={value} onClick={this.selectCard.bind(this)}>{text}</button>
        )
    }

    renderTableData(value) {
        return (
            <td className="Card-rank">
                {this.renderButton(value)}
            </td>
        )
    }

    renderTableRow(values) {
        return (
            <tr>
                {this.renderTableData(values[0])}
                {this.renderTableData(values[1])}
                {this.renderTableData(values[2])}
            </tr>
        )
    }

    render() {
        return (
            <table className="Card-selector">
                <tbody>
                {this.renderTableRow([2, 3, 4])}
                {this.renderTableRow([5, 6, 7])}
                {this.renderTableRow([8, 9, 10])}
                {this.renderTableRow(["J", "Q", "K"])}
                <tr>
                    <td colSpan="3" className="Card-rank ace">
                        {this.renderButton("Ace")}
                    </td>
                </tr>
                </tbody>
            </table>
        )
    }
}

export default CardSelector
