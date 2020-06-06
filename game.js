class Game {
  constructor() {
    this.player1 = new Player(0, []);
    this.player2 = new Player(0, []);
    this.cardPile = [];
    this.deck = ['CA', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10', 'Cjack', 'Cqueen', 'Cking',
    'SA', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9', 'S10', 'Sjack', 'Squeen', 'Sking' ,'DA', 'D2', 'D3',
    'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'Djack', 'Dqueen', 'Dking', 'HA', 'H2', 'H3', 'H4', 'H5', 'H6',
    'H7', 'H8', 'H9', 'H10', 'Hjack', 'Hqueen', 'Hking'];
  }

  shuffleDeck() {
    var shuffledDeck = [];

    for (var i = 0; i < this.deck.length; i++) {
      shuffledDeck.push(this.getRandomCard());
    }
    return shuffledDeck;
  }

  getRandomCard() {
    var randomIndex = Math.floor(Math.random() * this.deck.length);
    var randomCard = this.deck[randomIndex];

    return randomCard;
  }

  dealCards() {
    for (var i = 0; i < this.deck.length; i++) {
      if (i % 2 === 0) {
        this.player1.hand.push(this.getRandomCard());
      } else {
        this.player2.hand.push(this.getRandomCard());
      }
    }
  }

  addCard() {
    this.cardPile.push(this.player1.playCard());
  }
}
