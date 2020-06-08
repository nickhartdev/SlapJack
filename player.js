class Player {
  constructor(name) {
    this.id = Date.now();
    this.hand = [];
    this.wins = 0;
    this.name = name;
  }

  playCard() {
    var topCardArray = this.hand.splice(0, 1);
    var topCard = topCardArray.join();

    return topCard;
  }

  winGame() {
    this.wins += 1;
  }

  saveWinsToStorage(player) {
    var playerWins = JSON.stringify(this.wins);
    localStorage.setItem(`${player.name} wins`, playerWins);
  }

  retrieveWins(key) {
    var playerWins = localStorage.getItem(key);
    return playerWins;
  }
}
