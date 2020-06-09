var game = new Game();

window.onload = gameSetup();
document.addEventListener('keydown', playerActions);

function playerActions(event) {
  !game.gameOver ? playGame(event) : startNewGame(event);
}

function playGame(event) {
  var gameTurn = game.trackPlayerTurn();

  if (event.key === 'q' && (gameTurn === 'player 1' || game.finalRound)) {
    playCard(game.player1);
  } else if (event.key === 'f') {
    slapCard(game.player1);
  } else if (event.key === 'p' && (gameTurn === 'player 2' || game.finalRound)) {
    playCard(game.player2)
  } else if (event.key === 'j') {
    slapCard(game.player2);
  }
  game.trackPlayerTurn();
}

function gameSetup() {
  game.dealCards();
  updateWinDisplay();
}

function startNewGame(event) {
  if (event.key === ' ') {
    newGameDisplay();
    game.startNewGame();
  }
}

function playCard(player) {
  game.playCard(player);
  hideHeader();
  showTopCard();
  checkIfNoCards(player);
  showCenterPile();
  addBorderToPile(player);
}

function slapCard(player) {
  showHeader();
  game.finalRound ? updateFinalDisplay(player) : updateNormalDisplay(player);
  game.slap(player);
}

function updateNormalDisplay(player) {
  changeHeader(game.returnSlapResult(player));
}

function updateFinalDisplay(player) {
  if (game.checkSlap() === 'jack' && !player.hand.length) {
    changeHeader(`SLAPJACK! ${player.name} is back in the game!`);
    showDeck(player);
    hideCenterPile();
  } else if (game.checkSlap() === 'jack' && player.hand.length) {
    changeHeader(`SLAPJACK! ${player.name} wins the game!`);
    displayPlayerWin(player);
  } else if (game.checkSlap() != 'jack' && !player.hand.length) {
    changeHeader(`Oh no! ${player.name} lost this round!`);
    displayPlayerLoss(player);
  } else if (game.checkSlap() != 'jack' && player.hand.length) {
    changeHeader(`Oh no! ${player.name} puts a card at the bottom of the pile!`);
  }
}

function checkHandLength(player) {
  var centerPile = document.querySelector('.card-pile-image');

  if (player.hand.length) {
    addBorderToPile(player);
  }
}

function addBorderToPile(player) {
  if (player === game.player1) {
    addPlayer1Border();
  } else {
    addPlayer2Border()
  }
}

function addPlayer1Border() {
  var centerPile = document.querySelector('.card-pile-image');

  centerPile.classList.add('player-1-deck-border');
  centerPile.classList.remove('player-2-deck-border');
}

function addPlayer2Border() {
  var centerPile = document.querySelector('.card-pile-image');

  centerPile.classList.add('player-2-deck-border');
  centerPile.classList.remove('player-1-deck-border');
}

function displayPlayerWin(player) {
  player.winGame();
  game.saveWins();
  updateWinDisplay();
  hideCenterPile();
}

function displayPlayerLoss(player) {
  var otherPlayer;
  player === game.player1 ? otherPlayer = game.player2 : otherPlayer = game.player1;

  otherPlayer.winGame();
  game.saveWins();
  updateWinDisplay();
}

function newGameDisplay() {
  var player1Deck = document.querySelector('.player-1-deck');
  var player2Deck = document.querySelector('.player-2-deck');

  unhide(player1Deck);
  unhide(player2Deck);
  hideCenterPile();
  hideHeader();
}

function updateWinDisplay() {
  var player1WinText = document.querySelector('.player-1-wins');
  var player2WinText = document.querySelector('.player-2-wins');
  var player1Wins = game.player1.retrieveWins('Player 1 wins');
  var player2Wins = game.player2.retrieveWins('Player 2 wins');

  player1WinText.innerHTML = player1Wins.toString() + ' wins';
  player2WinText.innerHTML = player2Wins.toString() + ' wins';
}

function changeHeader(text) {
  var header = document.querySelector('.event-text');
  header.innerHTML = text;
}

function hideHeader() {
  var header = document.querySelector('.event-text');
  hide(header);
}

function showHeader() {
  var header = document.querySelector('.event-text');
  unhide(header);
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
  var cardPile = document.querySelector('.card-pile-image');
  var playerHand = player.hand.length;

  if (player === game.player1 && !playerHand) {
    hide(player1Deck);
    cardPile.classList.remove('.player-1-deck-border');
  } else if (player === game.player2 && !playerHand) {
    hide(player2Deck)
    cardPile.classList.remove('.player-1-deck-border');
  }
}

function showDeck(player) {
  var player1Deck = document.querySelector('.player-1-deck');
  var player2Deck = document.querySelector('.player-2-deck');

  if (player === game.player1) {
    unhide(player1Deck);
  } else if (player === game.player2) {
    unhide(player2Deck);
  }
}

function hide(element) {
  element.classList.add('hidden');
}

function unhide(element) {
  element.classList.remove('hidden');
}
