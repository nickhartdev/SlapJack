class Player {
  constructor(wins, hand) {
    this.id = Date.now();
    this.hand = [];
    this.wins = wins;
  }

  playCard() {
    var topCard = this.hand.shift();

    return topCard;
  }

  saveWinsToStorage() {

  }
}
