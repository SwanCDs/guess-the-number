let currentPlayer = 'X';
let board = Array(9).fill('');
let gameActive = false;
let timerInterval;
let timeElapsed = 0;

document.getElementById('startBtn').addEventListener('click', startGame);

const cells = document.querySelectorAll('.cell');
cells.forEach((cell) => {
    cell.addEventListener('click', () => handleCellClick(cell));
});

function startGame() {
    board.fill('');
    gameActive = true;
    currentPlayer = 'X';
    document.getElementById('status').textContent = "Player X's turn";
    document.getElementById('startBtn').disabled = true;
    document.getElementById('resetBtn').disabled = false;
    document.getElementById('replayBtn').disabled = true;
    updateBoard();
    startTimer();
}

function handleCellClick(cell) {
    const index = cell.getAttribute('data-index');

    if (board[index] || !gameActive) {
        alert("Please select an empty cell/We found a winner!/Tie");
        return;
    }

    board[index] = currentPlayer;
    updateBoard();
    checkWin();

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    document.getElementById('status').textContent = `Player ${currentPlayer}'s turn`;
}

function updateBoard() {
    cells.forEach((cell, index) => {
        cell.textContent = board[index];
    });
}

function checkWin() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const condition of winConditions) {
        if (board[condition[0]] && 
            board[condition[0]] === board[condition[1]] && 
            board[condition[0]] === board[condition[2]]) {
            document.getElementById('status').textContent = `Congratulations! Player ${board[condition[0]]} wins!`;
            gameActive = false;
            clearInterval(timerInterval);
            return;
        }
    }

    if (!board.includes('')) {
        document.getElementById('status').textContent = "It's a draw!";
        gameActive = false;
        clearInterval(timerInterval);
    }
}

function startTimer() {
    timeElapsed = 0;
    document.getElementById('timer').textContent = "Time Elapsed: 00:00:00";
    timerInterval = setInterval(() => {
        timeElapsed++;
        const hours = String(Math.floor(timeElapsed / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((timeElapsed % 3600) / 60)).padStart(2, '0');
        const seconds = String(timeElapsed % 60).padStart(2, '0');
        document.getElementById('timer').textContent = `Time Elapsed: ${hours}:${minutes}:${seconds}`;
    }, 1000);
}
