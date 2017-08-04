import React, { Component } from 'react';
import Card from './Card'
import './stylesheets/Hand.css';

class Hand extends Component {
    render() {
        return (
            <div className="Hand">
                <Card rank={this.props.cards[0]} suit={Card.chooseSuit()}/>
                <Card rank={this.props.cards[1]} suit={Card.chooseSuit()}/>
            </div>
        );
    }
}

export default Hand
