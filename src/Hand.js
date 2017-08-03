import React, { Component } from 'react';
import Card from './Card'

class Hand extends Component {
    render() {
        return (
            <div className="Hand">
                <Card rank={this.props.playerHand[0]}/>
                <Card rank={this.props.playerHand[1]}/>
            </div>
        );
    }
}

export default Hand;


