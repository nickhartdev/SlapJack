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

  shuffleDeck() {
    var shuffledDeck = [];
    var randomDeckOrder = this.createRandomDeckOrder();

    for (var i = 0; i < this.deck.length; i++) {
      shuffledDeck.push(this.deck[randomDeckOrder[i]]);
    }
    return shuffledDeck;
  }

  generateDeckOrder() {
    var deckIndexList = [];
    var deckIndex = 0;

    for (var i = 0; i < this.deck.length; i++) {
      deckIndexList.push(deckIndex);
      deckIndex += 1;
    }

    return this.shuffle(deckIndexList);
  }

  shuffleDeckOrder(indexList) {
    var shuffledList = [];

    for (var i = indexList.length; i > 0; i--) {
      var randomIndex = Math.floor(Math.random() * indexList.length);
      var randomDeckIndexArray = indexList.splice(randomIndex, 1);
      var randomDeckIndex = randomDeckIndexArray.join('');

      shuffledList.push(randomDeckIndex);
    }
    return shuffledList;
  }

  dealCards() {
    var shuffledDeck = this.shuffleDeck();

    for (var i = 0; i < this.deck.length; i++) {
      if (i % 2 === 0) {
        this.player1.hand.push(shuffledDeck[i]);
      } else {
        this.player2.hand.push(shuffledDeck[i]);
      }
    }
  }

  addCard() {
    this.cardPile.unshift(this.player1.playCard());
  }

  checkCard(card) {
    var cardValue = card.substring(1, card.length);

    return cardValue;
  }

  slap(player) {
    if (this.checkCard(this.cardPile[0]) === this.checkCard(this.cardPile[1])) {
      for (var i = 0; i < this.cardPile.length; i++) {
      return 'It\'s a match!';
      }
    } else if (this.checkCard(this.cardPile[0]) === this.checkCard(this.cardPile[2])) {
      return 'It\'s a sandwich!';
    }
  }
}
