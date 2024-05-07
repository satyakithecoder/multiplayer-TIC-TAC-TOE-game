const restartBtn = document.querySelector('button');
const statusText = document.querySelector('p');
const cells = document.querySelectorAll('.cells');
let currentPlayer = "X";
const checkWin = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
let options = ["", "", "", "", "", "", "", "", ""];

function initializeGame() {
    cells.forEach(cell => cell.addEventListener('click', () => {
        updateCell(cell);
    }));
    statusText.textContent = `${currentPlayer}'s turn`;
}

function updateCell(cell) {
    const cellIndex = cell.getAttribute("cellIndex");
    if (!(options[cellIndex] === "")) {
        return;
    } else {
        cell.textContent = currentPlayer;
        options[cellIndex] = currentPlayer;
        currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
        statusText.textContent = `${currentPlayer}'s turn`;

        const winner = checkWinner();
        if (winner) {
            statusText.textContent = `${winner} wins!`;
            let stop_arr = options.filter(Element => Element != "");
            options = stop_arr;
        } else if (!options.includes("")) {
            statusText.textContent = `It's a draw`;
        }
    }
}

restartBtn.addEventListener('click', function () {
    if (restartBtn.textContent === "Start") {
        initializeGame();
        restartBtn.textContent = "Restart";
    } else {
        restartBtn.textContent = "Start";
        cells.forEach(cell => {
            cell.textContent = "";
        });
        statusText.textContent = "";
        currentPlayer = "X";
        options = ["", "", "", "", "", "", "", "", ""];
    }
});

function checkWinner() {
    for (let i = 0; i < checkWin.length; i++) {
        const [a, b, c] = checkWin[i];
        if (options[a] && options[a] === options[b] && options[a] === options[c]) {
            return options[a];
        }
    }
    return null;
}