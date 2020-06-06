class Player {
  constructor() {
    this.id = Date.now();
    this.hand = [];
    this.wins = 0;
  }

  playCard() {
    var topCardArray = this.hand.splice(0, 1);
    var topCard = topCardArray.join();

    return topCard;
  }

  saveWinsToStorage() {

  }
}
