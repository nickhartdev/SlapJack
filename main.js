var test = new Game();

window.onload = test.dealCards();
document.addEventListener('keydown', playerActions);

function playerActions(event) {
  if (event.key === 'q' && test.turnCounter % 2 === 0) {
    test.playCard(test.player1);
  } else if (event.key === 'f') {
    test.slap(test.player1);
  } else if (event.key === 'p' && test.turnCounter % 2 != 0) {
    test.playCard(test.player2);
  } else if (event.key === 'j') {
    test.slap(test.player2);
  }
}
