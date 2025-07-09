let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreboard();

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  const autoPlayBtn = document.querySelector('.auto-play-button');
  if (!isAutoPlaying) {
    intervalId = setInterval(function () {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
    autoPlayBtn.innerHTML = 'Stop';
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    autoPlayBtn.innerHTML = 'Auto Play'
  }
}


function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = '';

  if (playerMove === computerMove) {
    result = 'It\'s a Tie!';
    score.ties++;
  } else if (
    (playerMove === 'Rock' && computerMove === 'Scissors') ||
    (playerMove === 'Paper' && computerMove === 'Rock') ||
    (playerMove === 'Scissors' && computerMove === 'Paper')
  ) {
    result = 'You Win!';
    score.wins++;
  } else {
    result = 'You Lose!';
    score.losses++;
  }

  localStorage.setItem('score', JSON.stringify(score));
  document.getElementById('result').textContent = `You chose ${playerMove}, computer chose ${computerMove}. ${result}`;
  updateScoreboard();
}

function pickComputerMove() {
  const moves = ['Rock', 'Paper', 'Scissors'];
  const randomIndex = Math.floor(Math.random() * 3);
  return moves[randomIndex];
}

function updateScoreboard() {
  document.getElementById('wins').textContent = score.wins;
  document.getElementById('losses').textContent = score.losses;
  document.getElementById('ties').textContent = score.ties;
}

function resetScore() {
  score = { wins: 0, losses: 0, ties: 0 };
  localStorage.removeItem('score');
  updateScoreboard();
  document.getElementById('result').textContent = '';
}
