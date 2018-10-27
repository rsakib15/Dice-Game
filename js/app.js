var scores, roundScore, activePlayer;
const getDestructuredElementsByIds = (document) => {
  return new Proxy({}, {
    get: (_, id) => document.getElementById(id),
  });
};

const { 
  name0, 
  name1,
  score0,
  score1,
  current0,
  current1,
  btnNew,
  btnRoll,
  btnHold,
  dice,
  playerPanel0,
  playerPanel1,
} = getDestructuredElementsByIds(document);

const gamePlaying = (booleanValue) => {
  const state = booleanValue ? 'block' : 'none';
  dice.style.display = state;
  btnRoll.style.display = state;
  btnHold.style.display = state;
};

const nextPlayer = () => {
  dice.style.display = 'none';
  activePlayer === 1 ? activePlayer = 0 : activePlayer = 1;
  roundScore = 0;
  playerPanel0.classList.toggle('is-active');
  playerPanel1.classList.toggle('is-active');
};

const init = () => {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  score0.textContent = '0';
  score1.textContent = '0';
  current0.textContent = '0';
  current1.textContent = '0';
  name0.textContent = 'Player 1';
  name1.textContent = 'Player 2';

  playerPanel0.classList.remove('is-winner', 'is-active');
  playerPanel1.classList.remove('is-winner', 'is-active');
  playerPanel0.classList.add('is-active');

  gamePlaying(true);
};

init();
btnNew.addEventListener('click', init);

btnRoll.addEventListener('click', () => {
  const diceValue = Math.floor(Math.random() * 6) + 1;
  const currentPlayerScore = document.getElementById(`current${activePlayer}`);

  if (diceValue !== 1) {
    dice.style.display = 'block';
    dice.src = `images/dice-${diceValue}.png`;
    roundScore += diceValue;
    currentPlayerScore.textContent = roundScore;
  } else {
    nextPlayer();
  }
});

btnHold.addEventListener('click', () => {
  scores[activePlayer] += roundScore;
  const currentPlayerHoldedScore = document.getElementById(`score${activePlayer}`);
  currentPlayerHoldedScore.textContent = scores[activePlayer];
  if (scores[activePlayer] >= 100) {
    const currentPlayerName = document.getElementById(`name${activePlayer}`);
    currentPlayerName.textContent = 'Winner';

    const currentPlayerPanel = document.getElementById(`playerPanel${activePlayer}`);
    currentPlayerPanel.classList.add('is-winner');
    currentPlayerPanel.classList.remove('is-active'); 
    gamePlaying(false);
  } else {
    nextPlayer();
  }
});
