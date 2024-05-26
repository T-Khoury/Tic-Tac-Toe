const gameBoard = (function() {
    const board = [];
    

    for (let i = 0; i<9; i++) {
        board[i]= [''];
    }

    const getBoard = () => board;

    const newMove = (cell, player) => {
        cell[0] = player.getMarker();
    };

    return {getBoard, newMove};
})();

const displayController = (function() {
    const boardDiv = document.querySelector('.gameboard');
    const settingsModal = document.querySelector('.settings-modal');
    const gameSettings = document.querySelector('#game-settings')
    const submitButton = document.querySelector('#submit-button');
    const modalCloseButton = document.querySelector('.modal-close-btn');
    const playerOneInput = document.querySelector('#playerOneName');
    const playerTwoInput = document.querySelector('#playerTwoName');
    const players  = [];

    let activePlayer;
    const getPlayers = () => players;
    const getActivePlayer = () => activePlayer;

    function setPlayers() {
        const player1 = Player(playerOneInput.value, 'X');
        const player2 = Player(playerTwoInput.value, 'O');
        players.push(player1, player2);
        console.log(players[0].getMarker());
        activePlayer = players[0];
    };

    function changeTurn() {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const isSubset = (array1, array2) => array2.every((element) => array1.includes(element))

    function getPlayersTokens() {
        const board = gameBoard.getBoard();
        const currentPlayersTokens = [];
        board.forEach((x) => {
            if (x[0] === `${activePlayer.getMarker()}`) {
                currentPlayersTokens.push(board.indexOf(x))
            }});
        return currentPlayersTokens;
    }

    function checkWin() {
        const currentPlayersPositions = getPlayersTokens();
        const winningCombos = [
            [0,1,2],
            [0,3,6],
            [0,4,8],
            [3,4,5],
            [1,4,7],
            [2,4,6],
            [6,7,8],
            [2,5,8],
        ];
        const gameWon = winningCombos.find((combo) => isSubset(currentPlayersPositions, combo));

        return gameWon
    };

    function endGameModalHandler() {

    }


    function settingsModalHandler() {
        settingsModal.style.display = "block";
        window.onclick = function(e) {
            if(e.target == settingsModal) {
                settingsModal.style.display = "none"
            };
        };
    };



    function getGameMode() {
        const modeToggle = document.querySelector('.modetoggle');
        console.log(modeToggle.checked);
        if (modeToggle.checked) {

        }
    }

    function updateDisplay() {
        boardDiv.textContent = "";
        const board = gameBoard.getBoard();
        board.forEach(cell => {
            const cellButton = document.createElement('button');
            cellButton.dataset.indexNumber = `${board.indexOf(cell)}`
            cellButton.classList.add('cell');
            cellButton.textContent = `${cell[0]}`;
            boardDiv.appendChild(cellButton);
        })
    }



    function placeToken(e) {
        const chosenCell = e.target.dataset.indexNumber;
        console.log(chosenCell);
        gameBoard.newMove(gameBoard.getBoard()[chosenCell], activePlayer);
        updateDisplay();
    };

    boardDiv.addEventListener('click', (e) => {
        placeToken(e);
        console.log(!!(checkWin()));
        changeTurn();
    });

    modalCloseButton.addEventListener('click', () => {
        settingsModal.style.display = "none";
    });

    submitButton.addEventListener('click', (event) => {
        event.preventDefault();
        settingsModal.style.display = "none";
        setPlayers();
        gameSettings.reset();
     
    });

    return {updateDisplay, getGameMode, placeToken, settingsModalHandler, getPlayers, setPlayers, getActivePlayer, checkWin};
})();

const Player = (name, marker) => {

    const getName = () => name;
    const getMarker = () => marker;


    return {getName, getMarker};

};

gameBoard.getBoard();

displayController.updateDisplay();
displayController.settingsModalHandler();