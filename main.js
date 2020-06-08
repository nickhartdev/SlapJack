var game = new Game();

window.onload = gameSetup();
document.addEventListener('keydown', playerActions);

function playerActions(event) {
  game.gameOver === false ? playGame(event) : startNewGame(event);
}

function playGame(event) {
  var gameTurn = game.trackPlayerTurn();

  if (event.key === 'q' && (gameTurn === 'player 1' || game.finalRound === true)) {
    playCard(game.player1);
  } else if (event.key === 'f') {
    slapCard(game.player1);
  } else if (event.key === 'p' && (gameTurn === 'player 2' || game.finalRound === true)) {
    playCard(game.player2)
  } else if (event.key === 'j') {
    slapCard(game.player2);
  }
}

function gameSetup() {
  game.dealCards();
  updateWinDisplay();
}

function startNewGame(event) {
  if (event.key === ' ') {
    game.startNewGame();
    newGameDisplay();
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
  showHeader();
  game.finalRound === true ? updateFinalDisplay(player) : updateNormalDisplay(player);
  game.slap(player);
}

function updateNormalDisplay(player) {
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

function updateFinalDisplay(player) {
  if (game.checkSlap() === 'jack' && player.hand.length === 0) {
    changeHeader(`SLAPJACK! ${player.name} is back in the game!`);
    showDeck(player);
    hideCenterPile();
  } else if (game.checkSlap() === 'jack' && player.hand.length > 0) {
    changeHeader(`SLAPJACK! ${player.name} wins the game!`);
    displayPlayerWin(player);
  } else if (game.checkSlap() != 'jack' && player.hand.length === 0) {
    changeHeader(`Oh no! ${player.name} lost this round!`);
    displayPlayerLoss(player);
  } else if (game.checkSlap() != 'jack' && player.hand.length > 0) {
    changeHeader(`Oh no! ${player.name} puts a card at the bottom of the pile!`);
  }
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

  if (player1Wins === null || player2Wins === null) {
    player1WinText.innerHTML = '0 wins';
    player2WinText.innerHTML = '0 wins';
  } else {
    player1WinText.innerHTML = player1Wins + ' wins';
    player2WinText.innerHTML = player2Wins + ' wins';
  }
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
  var playerHand = player.hand.length;

  if (player === game.player1 && playerHand === 0) {
    hide(player1Deck);
  } else if (player === game.player2 && playerHand === 0) {
    hide(player2Deck)
  }
}

function showDeck(player) {
  var player1Deck = document.querySelector('.player-1-deck');
  var player2Deck = document.querySelector('.player-2-deck');
  var playerHand = player.hand.length;

  if (player === game.player1 && playerHand === 0) {
    unhide(player1Deck);
  } else if (player === game.player2 && playerHand === 0) {
    unhide(player2Deck);
  }
}

function hide(element) {
  element.classList.add('hidden');
}

function unhide(element) {
  element.classList.remove('hidden');
}
