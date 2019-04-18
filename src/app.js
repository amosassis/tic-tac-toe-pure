const app = document.getElementById('board');
const player = document.getElementById('player');
const placar = document.getElementById('placar');
let moveElements = {};
const moves = ['X', 'O'];
const totalPoints = {
    0: 0,
    1: 0
};
let priorMoveIndex = 0;
let actualMoveIndex = 0;
let gameStatus = 0;
const winnerCombinattions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let movesRegister = [];

function resetRegister() {
    movesRegister = Array(9).fill('');
}


function checkWinner() {
    winnerCombinattions.forEach((combination, index) => {
        let combinationMoves = [
            movesRegister[combination[0]],
            movesRegister[combination[1]],
            movesRegister[combination[2]],
        ];
        let resultSum = combinationMoves.reduce((a, b) => {
            return a + b;
        });
        if (resultSum === 0 || resultSum === 3) {
            setWinner(index);
        } else {
            let emptyFields = movesRegister.filter(a => a === '')

            if (emptyFields.length === 0) {
                setTiedGame()
            }

            return false;
        }
    });

}

function setWinner(winnerIndex) {
    const winnerCombinattion = winnerCombinattions[winnerIndex];
    let winnerPlayer = '';
    moveElements.forEach((element, index) => {
        if (winnerCombinattion.includes(index)) {
            element.classList.add('winner');
            winnerPlayer = element.innerHTML;
            actualMoveIndex = priorMoveIndex;
        }
    });

    if (winnerPlayer) {
        totalPoints[priorMoveIndex]++;
        gameStatus = 2;
    }

    resetGame();

}

function resetGame() {
    setTimeout(() => {
        printGame();
    }, 2000);
}

function setTiedGame() {
    gameStatus = 3;
    resetGame();
}

function toggleMove() {
    priorMoveIndex = actualMoveIndex;
    actualMoveIndex = (actualMoveIndex === 0) ? 1 : 0;
    gameStatus = 1;
}

function printLabel() {
    let playerLabel = moves[actualMoveIndex];
    switch (gameStatus) {
        case 0:
            label = 'Primeiro jogador: ';
            break;
        case 1:
            label = 'Próximo jogador: ';
            break;
        case 2:
            label = 'Fim de jogo! Ganhador: ';
            gameStatus = 0;
            break;
        case 3:
            label = 'Fim de jogo! Empatado!';
            playerLabel = '';
            gameStatus = 0;
            break;
    }
    player.innerHTML = `${label} ${playerLabel}`;
}
function printGame() {
    printLabel();
    printPlacar();
    resetRegister();
    let content = '<div class="wrapper">';
    for (let i = 0; i < movesRegister.length; i++) {
        content += `<button class="btn-move" data-index="${i}">${moves[movesRegister[i]] || ''}</button>`;
    }
    content += '</div>';
    app.innerHTML = content;


    moveElements = document.querySelectorAll('.btn-move');
    moveElements.forEach((moveItem, index) => {
        moveItem.addEventListener('click', (e) => {
            if (moveItem.innerHTML === '') {
                moveItem.innerHTML = moves[actualMoveIndex];
                movesRegister[index] = actualMoveIndex;
                toggleMove();
                checkWinner();
                printLabel();
            }
        });
    });
}
function printPlacar() {
    placar.innerHTML = `
        <div class="wrapper">
            <div class="player-x-total total-points">
                <p>Jogador X</p>
                <div>${totalPoints[0]}</div>
            </div>
            <div class="player-o-total total-points">
                <p>Jogador O</p>
                <div>${totalPoints[1]}</div>
            </div>
        </div>
    `;
}

printGame();
