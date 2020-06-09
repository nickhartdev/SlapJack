class Player {
  constructor(name) {
    this.id = Date.now();
    this.hand = [];
    this.wins = this.retrieveWins(this.name + ' wins');
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

    if (!localStorage.getItem(`${player.name} wins`)) {
      localStorage.setItem(`${player.name} wins`, playerWins);
    } else {
      localStorage[`${player.name} wins`] = playerWins;
    }
  }

  retrieveWins(key) {
    var playerWins = localStorage.getItem(key);

    playerWins === null ? playerWins = 0 : playerWins;
    return playerWins;
  }
}
