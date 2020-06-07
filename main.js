var game = new Game();

window.onload = game.dealCards();
document.addEventListener('keydown', playerActions);

function playerActions(event) {
  var gameTurn = game.trackPlayerTurn();

  if (event.key === 'q' && gameTurn === 'player 1') {
    playCard(game.player1);
  } else if (event.key === 'f') {
    slapCard(game.player1);
  } else if (event.key === 'p' && gameTurn === 'player 2') {
    playCard(game.player2)
  } else if (event.key === 'j') {
    slapCard(game.player2);
  }
}

function playCard(player) {
  game.playCard(player);
  hideHeader();
  showCenterPile();
  showTopCard();
  checkIfNoCards(player);
}

function slapCard(player) {
  updateDisplay(player);
  game.slap(player);
}

function updateDisplay(player) {
  if (game.checkSlap() === 'jack') {
    changeHeader(`SLAPJACK! ${player.name} takes the pile!`);
    hideCenterPile();
  } else if (game.checkSlap() === 'pair') {
    changeHeader(`Pair! ${player.name} takes the pile!`);
    hideCenterPile();
  } else if (game.checkSlap() === 'sandwich') {
    changeHeader(`Sandwich! ${player.name} takes the pile!`);
    hideCenterPile();
  } else if (game.checkSlap() === 'WHOOPS') {
    changeHeader(`Whoops! ${player.name} puts a card at the bottom of the pile!`);
  }
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

function hideCenterPile() {
  var cardPile = document.querySelector('.card-pile-image');

  hide(cardPile);
  cardPile.src = '';
}

function showCenterPile() {
  var cardPile = document.querySelector('.card-pile-image');
  unhide(cardPile);
}

function checkIfNoCards(player) {
  var player1Deck = document.querySelector('.player-1-deck');
  var player2Deck = document.querySelector('.player-2-deck');
  var playerHand = player.hand.length;

  if (player === game.player1 && playerHand === 0) {
    hide(player1Deck);
  } else if (player === game.player2 && playerHand === 0) {
    hide(player2Deck)
  }
}

function hide(element) {
  element.classList.add('hidden');
}

function unhide(element) {
  element.classList.remove('hidden');
}
