var test = new Game();

test.dealCards();
var buttons = document.addEventListener('keydown', playerActions);

function playerActions(event) {
  if (event.key === 'q') {
    test.playCard(test.player1);
  } else if (event.key === 'f') {
    test.slap(test.player1);
  } else if (event.key === 'p') {
    test.playCard(test.player2);
  } else if (event.key === 'j') {
    test.slap(test.player2);
  }
}
