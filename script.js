const cells = document.querySelectorAll('[data-cell]');
const gameStatus = document.getElementById('game-status');
const resetButton = document.getElementById('reset-button');
let isXTurn = true; // Tracks current player (X or O)
let gameActive = true;

// Winning combinations
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Handle cell click
function handleCellClick(e) {
  const cell = e.target;
  const currentClass = isXTurn ? 'X' : 'O';

  if (gameActive && !cell.classList.contains('taken')) {
    cell.textContent = currentClass;
    cell.classList.add('taken', currentClass);

    if (checkWin(currentClass)) {
      gameStatus.textContent = `Player ${currentClass} Wins!`;
      gameActive = false;
    } else if (Array.from(cells).every(cell => cell.classList.contains('taken'))) {
      gameStatus.textContent = "It's a Tie!";
      gameActive = false;
    } else {
      isXTurn = !isXTurn;
      gameStatus.textContent = `Player ${isXTurn ? 'X' : 'O'}'s turn`;
    }
  }
}

// Check for win condition
function checkWin(currentClass) {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

// Reset the game
function resetGame() {
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken', 'X', 'O');
  });
  isXTurn = true;
  gameActive = true;
  gameStatus.textContent = "Player X's turn";
}

// Add event listeners
cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});
resetButton.addEventListener('click', resetGame);
