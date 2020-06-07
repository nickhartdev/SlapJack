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
  showTopCard();
  unhideCenterPile();
}

function slapCard(player) {
  if (game.checkSlap() === 'jack') {
    game.slap(player);
    changeHeader('SlapJack!');
    collectCenterPile();
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
  var centerPileContainer = document.querySelector('.card-pile');
  centerPileContainer.classList.add('hidden');
}

function unhideCenterPile() {
  var centerPileContainer = document.querySelector('.card-pile');
  centerPileContainer.classList.remove('hidden');
}
