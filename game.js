class Game {
  constructor() {
    this.player1 = new Player('Player 1');
    this.player2 = new Player('Player 2');
    this.cardPile = [];
    this.turnCounter = 0;
    this.finalRound = false;
    this.gameOver = false;
    this.deck = deck;
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
    this.turnCounter += 1;
    if (player.hand.length === 0) {
      return;
    } else {
      this.moveCardToTop(player.hand, this.cardPile);
    }
  }

  checkCard(card) {
    var cardValue;

    if (card.includes('red') === true) {
      cardValue = card.substring(11, card.length - 4);
    } else if (card.includes('blue') === true || card.includes('gold') === true) {
      cardValue = card.substring(12, card.length - 4);
    } else if (card.includes('green') === true) {
      cardValue = card.substring(13, card.length - 4);
    }
    return cardValue;
  }

  checkSlap() {
    if (this.checkCard(game.cardPile[0]) === 'jack') {
      return 'jack';
    } else if (this.checkCard(game.cardPile[0]) === this.checkCard(game.cardPile[1])) {
      return 'pair';
    } else if (this.checkCard(game.cardPile[0]) === this.checkCard(game.cardPile[2])) {
      return 'sandwich';
    } else {
      return 'WHOOPS';
    }
  }

  trackPlayerTurn() {
    var player1Cards = this.player1.hand.length;
    var player2Cards = this.player2.hand.length;

    if (player1Cards === 0 || player2Cards === 0) {
      this.finalRound = true;
    } else if (this.turnCounter % 2 === 0) {
      return 'player 1';
    } else if (this.turnCounter % 2 != 0) {
      return 'player 2';
    }
  }

  slap(player) {
    this.finalRound === true ? this.followFinalRoundRules(player) : this.followNormalRules(player);
  }

  followNormalRules(player) {
    if (this.checkSlap() === 'WHOOPS') {
      this.moveCardToBottom(player.hand, this.cardPile);
    } else {
      this.shuffleIntoHand(player);
    }
  }

  followFinalRoundRules(player) {
    var playerHand = player.hand.length;

    playerHand === 0 ? this.playToStayInGame(player) : this.playToWin(player);
  }

  playToWin(player) {
    if (this.checkCard(this.cardPile[0]) === 'jack') {
      player.winGame();
      this.shuffleIntoHand(player);
      this.gameOver = true;
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
      this.gameOver = true;
    }
  }

  removeCard(startingPile) {
    var removedCardArray = startingPile.splice(0, 1);
    var removedCard = removedCardArray.join('');

    return removedCard;
  }

  moveCardToBottom(startingPile, endingPile) {
    endingPile.push(this.removeCard(startingPile));
  }

  moveCardToTop(startingPile, endingPile) {
    endingPile.unshift(this.removeCard(startingPile));
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
    this.gameOver = false;
    this.dealCards();
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
