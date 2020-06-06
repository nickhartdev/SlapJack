class Player {
  constructor(wins, hand) {
    this.id = Date.now();
    this.hand = [];
    this.wins = wins;
  }

  playCard() {
    var topCardArray = this.hand.splice(0, 1);
    var topCard = topCardArray.join();

    return topCard;
  }

  saveWinsToStorage() {

  }
}
