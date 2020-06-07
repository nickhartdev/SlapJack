var game = new Game();

window.onload = game.dealCards();
document.addEventListener('keydown', playerActions);

function playerActions(event) {
  if (event.key === 'q' && game.turnCounter % 2 === 0) {
    playCard(game.player1);
  } else if (event.key === 'f') {
    slapCard(game.player1);
  } else if (event.key === 'p' && game.turnCounter % 2 != 0) {
    playCard(game.player2)
  } else if (event.key === 'j') {
    slapCard(game.player2);
  }
}

function playCard(player) {
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

function hide(element) {
  element.classList.add('hidden');
}

function unhide(element) {
  element.classList.remove('hidden');
}
