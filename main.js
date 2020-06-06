var test = new Game();

var buttons = document.addEventListener('keydown', playerActions);

function playerActions(event) {
  if (event.key === 'q') {
    test.playCard(test.player1);
  } else if (event.key === 'p') {
    test.playCard(test.player2);
  }
}
