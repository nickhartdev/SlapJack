class Game {
  constructor() {
    this.player1 = new Player();
    this.player2 = new Player();
    this.cardPile = [];
    this.deck = ['CA', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10', 'Cjack', 'Cqueen', 'Cking',
    'SA', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9', 'S10', 'Sjack', 'Squeen', 'Sking' ,'DA', 'D2', 'D3',
    'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'Djack', 'Dqueen', 'Dking', 'HA', 'H2', 'H3', 'H4', 'H5', 'H6',
    'H7', 'H8', 'H9', 'H10', 'Hjack', 'Hqueen', 'Hking'];
  }

  shuffleCards(cards) {
    var shuffledDeck = [];
    var randomDeckOrder = this.generateShuffledIndexList(cards);

    for (var i = 0; i < cards.length; i++) {
      shuffledDeck.push(this.deck[randomDeckOrder[i]]);
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
    this.cardPile.unshift(player.playCard());
    console.log(this.cardPile);
  }

  checkCard(card) {
    var cardValue = card.substring(1, card.length);

    return cardValue;
  }

  slap(player) {
    if (this.checkCard(this.cardPile[0]) === this.checkCard(this.cardPile[1])) {
      shuffleIntoHand(player);
      return 'It\'s a match!';
    } else if (this.cardPile.length > 2 && this.checkCard(this.cardPile[0]) === this.checkCard(this.cardPile[2])) {
      shuffleIntoHand(player);
      return 'It\'s a sandwich!';
    } else {
      return 'Lol whoops, illegal slap';
    }
  }

  shuffleIntoHand(player) {
    for (var i = 0; i < this.cardPile.length; i++) {
      moveCard(this.cardPile, player.hand)
    }
    player.hand = shuffleCards(player.hand);
  }

  moveCard(startingPile, endingPile) {
    var removedCardArray = startingPile.splice(startingPile[0], 1);
    var removedCard = removedCardArray.join('');

    endingPile.push(removedCard);
  }
}
