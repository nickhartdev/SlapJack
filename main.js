var test = new Game();

window.onload = test.dealCards();
document.addEventListener('keydown', playerActions);

function playerActions(event) {
  test.turnCounter % 2 === 0 ? disablePlayer2Controls(event) : disablePlayer1Controls(event);
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

function disablePlayer2Controls(event) {
  if (event.key === 'p') {
    event.preventDefault();
  }
}

function disablePlayer1Controls(event) {
  if (event.key === 'q') {
    event.preventDefault();
  }
}
