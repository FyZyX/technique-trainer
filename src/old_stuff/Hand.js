class Card {
  constructor(lavel) {
    this.label = label;
  }

  get value() {
    if (this.lable === 'T') {
      return 10;
    } else if (this.value === 'A') {
      return 11;
    } else {
      return parseInt(this.value);
    }
  }
}

class PlayerHand {
  constructor(firstCard, secondCard) {
    this.cards = [firstCard, secondCard];
  }

  get total() {
    return (this.cards[0].value + this.cards[1].value).toString();
  }

class Hand {
  constructor(playerHand, dealerUpCard) {
    this.playerHand = playerHand;
    this.dealerUpCard = dealerUpCard;
  }
}


