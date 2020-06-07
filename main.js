var game = new Game();

window.onload = game.dealCards();
document.addEventListener('keydown', playerActions);

function playerActions(event) {
  var gameTurn = game.trackPlayerTurn();

  if (event.key === 'q' && (gameTurn === 'player 1' || gameTurn === 'final round')) {
    playCard(game.player1);
  } else if (event.key === 'f') {
    slapCard(game.player1);
  } else if (event.key === 'p' && (gameTurn === 'player 2' || gameTurn === 'final round')) {
    playCard(game.player2)
  } else if (event.key === 'j') {
    slapCard(game.player2);
  }
}

function playCard(player) {
  if (player === game.player1) {
    updatePlayer1CardsLeft();
  } else {
    updatePlayer2CardsLeft();
  }
  game.playCard(player);
  hideHeader();
  unhideCenterPile();
  showTopCard();
}

function slapCard(player) {
  if (game.checkSlap() === 'jack') {
    game.checkIfFinalRound(player);
    changeHeader('SlapJack!');
    collectCenterPile();
  } else if (game.checkSlap() === 'pair') {
    game.checkIfFinalRound(player);
    changeHeader('Pair!');
    collectCenterPile();
  } else if (game.checkSlap() === 'sandwich') {
    game.checkIfFinalRound(player);
    changeHeader('Sandwich!');
    collectCenterPile();
  } else if (game.checkSlap() === 'WHOOPS') {
    game.checkIfFinalRound(player);
    changeHeader('WHOOPS');
  }
  updatePlayer1CardsLeft();
  updatePlayer2CardsLeft();
}

function changeHeader(text) {
  var header = document.querySelector('.event-text');
  header.innerHTML = text;
}

function hideHeader() {
  var header = document.querySelector('.event-text');
  header.innerHTML = '';
}

function showTopCard() {
  var cardPileImage = document.querySelector('.card-pile-image');
  cardPileImage.src = game.cardPile[0];
}

function collectCenterPile() {
  var cardPile = document.querySelector('.card-pile-image');

  hide(cardPile);
  cardPile.src = '';
}

function unhideCenterPile() {
  var cardPile = document.querySelector('.card-pile-image');
  unhide(cardPile);
}

function updatePlayer1CardsLeft() {
  var player1Cards = document.querySelector('.number-of-cards1');

  player1Cards.innerHTML = game.player1.hand.length;
}

function updatePlayer2CardsLeft() {
  var player2Cards = document.querySelector('.number-of-cards2');

  player2Cards.innerHTML = game.player2.hand.length;
}

function checkIfNoCards() {
  var playerDeck = document.querySelector('.deck');
  var playerHand = game.player.hand.length;

  if (playerHand === 0) {
    hide(deck);
  }
}

function hide(element) {
  element.classList.add('hidden');
}

function unhide(element) {
  element.classList.remove('hidden');
}
