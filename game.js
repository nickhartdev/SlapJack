class Game {
  constructor() {
    this.player1 = new Player();
    this.player2 = new Player();
    this.cardPile = [];
    this.turnCounter = 0;
    this.deck = ['CA', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10', 'Cjack', 'Cqueen', 'Cking',
    'SA', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9', 'S10', 'Sjack', 'Squeen', 'Sking' ,'DA', 'D2', 'D3',
    'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'Djack', 'Dqueen', 'Dking', 'HA', 'H2', 'H3', 'H4', 'H5', 'H6',
    'H7', 'H8', 'H9', 'H10', 'Hjack', 'Hqueen', 'Hking'];
  }

  dealCards() {
    var shuffledDeck = this.shuffleCards(this.deck);

    for (var i = 0; i < this.deck.length; i++) {
      if (i % 2 === 0) {
        this.player1.hand.push(shuffledDeck[i]);
      } else {
        this.player2.hand.push(shuffledDeck[i]);
      }
    }
  }

  playCard(player) {
    if (player.hand.length === 0) {
      return;
    } else {
      this.moveCardToTop(player.hand, this.cardPile);
    }
  }

  checkCard(card) {
    var cardValue = card.substring(1, card.length);

    return cardValue;
  }

  slap(player) {
    var player1Cards = this.player1.hand.length;
    var player2Cards = this.player2.hand.length;

    player1Cards > 0 && player2Cards > 0 ? this.playAsNormal(player) : this.playFinalRound(player);
  }

  playAsNormal(player) {
    if (this.checkCard(this.cardPile[0]) === 'jack') {
      this.shuffleIntoHand(player);
    } else if (this.checkCard(this.cardPile[0]) === this.checkCard(this.cardPile[1])) {
      this.shuffleIntoHand(player);
    } else if (this.cardPile.length > 2 && this.checkCard(this.cardPile[0]) === this.checkCard(this.cardPile[2])) {
      this.shuffleIntoHand(player);
    } else {
      this.moveCardToBottom(player.hand, this.cardPile);
    }
  }

  playFinalRound(player) {
    var playerHand = player.hand.length;

    playerHand === 0 ? this.playToStayInGame(player) : this.playToWin(player);
  }

  playToWin(player) {
    if (this.checkCard(this.cardPile[0]) === 'jack') {
      player.winGame();
      this.startNewGame();
    } else {
      this.moveCardToBottom(player.hand, this.cardPile);
    }
  }

  playToStayInGame(player) {
    var otherPlayer;
    player === this.player1 ? otherPlayer = this.player2 : otherPlayer = this.player1;

    if (this.checkCard(this.cardPile[0]) === 'jack') {
      this.shuffleIntoHand(player);
    } else {
      otherPlayer.winGame();
      this.startNewGame();
    }
  }

  shuffleIntoHand(player) {
    for (var i = this.cardPile.length; i > 0; i--) {
      this.moveCardToBottom(this.cardPile, player.hand);
    }
    player.hand = this.shuffleCards(player.hand);
  }

  startNewGame() {
    this.player1.hand = [];
    this.player2.hand = [];
    this.cardPile = [];
    this.dealCards();
  }

  moveCardToBottom(startingPile, endingPile) {
    endingPile.push(this.removeCard());
  }

  moveCardToTop(startingPile, endingPile) {
    endingPile.unshift(this.removeCard());
  }

  removeCard() {
    var removedCardArray = startingPile.splice(startingPile[0], 1);
    var removedCard = removedCardArray.join('');

    return removedCard;
  }

  shuffleCards(cards) {
    var shuffledDeck = [];
    var randomDeckOrder = this.generateShuffledIndexList(cards);

    for (var i = 0; i < cards.length; i++) {
      shuffledDeck.push(cards[randomDeckOrder[i]]);
    }
    return shuffledDeck;
  }

  generateShuffledIndexList(cards) {
    var deckIndexList = [];
    var deckIndex = 0;

    for (var i = 0; i < cards.length; i++) {
      deckIndexList.push(deckIndex);
      deckIndex += 1;
    }
    return this.shuffleIndexOrder(deckIndexList);
  }

  shuffleIndexOrder(deckIndexList) {
    var shuffledList = [];

    for (var i = deckIndexList.length; i > 0; i--) {
      var randomIndex = Math.floor(Math.random() * deckIndexList.length);
      var randomDeckIndexArray = deckIndexList.splice(randomIndex, 1);
      var randomDeckIndex = randomDeckIndexArray.join('');

      shuffledList.push(randomDeckIndex);
    }
    return shuffledList;
  }
}
