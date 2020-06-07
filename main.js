var test = new Game();

window.onload = gameSetup();
document.addEventListener('keydown', playerActions);

function playerActions(event) {
  if (event.key === 'q' && test.turnCounter % 2 === 0) {
    playCard(test.player1);
  } else if (event.key === 'f') {
    test.slap(test.player1);
  } else if (event.key === 'p' && test.turnCounter % 2 != 0) {
    test.playCard(test.player2);
  } else if (event.key === 'j') {
    test.slap(test.player2);
  }
}

function gameSetup() {
  test.dealCards();
}

function playCard(player) {
  test.playCard(player);
  showTopCard();
}

function showTopCard() {
  var centerPileContainer = document.querySelector('.card-pile');
  var cardPileImage = document.querySelector('.card-pile-image');

  centerPileContainer.classList.remove('hidden');
  cardPileImage.src = test.cardPile[0];
}
