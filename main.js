var game = new Game();

window.onload = gameSetup();
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

function gameSetup() {
  game.dealCards();
}

function playCard(player) {
  game.playCard(player);
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

function showTopCard() {
  var cardPileImage = document.querySelector('.card-pile-image');
  cardPileImage.src = game.cardPile[0];
}

function collectCenterPile() {
  var cardPile = document.querySelector('.card-pile-image');
  cardPile.classList.add('hidden');
  cardPile.src = "";
}

function unhideCenterPile() {
  var cardPile = document.querySelector('.card-pile-image');
  cardPile.classList.remove('hidden');
}
