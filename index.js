const gameBoard = (function() {
    const board = [];

    for (let i = 0; i<9; i++) {
        board[i]= [''];
    }

    const getBoard = () => board;

    const newMove = (cell, player) => {
        cell[0] = player.getMarker();
    }


    return {getBoard, newMove};
})();

const displayController = (function() {
    const boardDiv = document.querySelector('.gameboard');
    

    const players  = [];

    const settingsModal = document.querySelector('.settings-modal');
    const gameSettings = document.querySelector('#game-settings')

    const submitButton = document.querySelector('#submit-button');

    const modalCloseButton = document.querySelector('.modal-close-btn');


    function settingsModalHandler() {
        settingsModal.style.display = "block";
        window.onclick = function(e) {
            if(e.target == settingsModal) {
                settingsModal.style.display = "none"
            }
        }
    }



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



    function clickHandler(e) {
        const chosenCell = e.target.dataset.indexNumber;
        console.log(chosenCell);
        gameBoard.newMove(gameBoard.getBoard()[chosenCell], Trevor);
        updateDisplay();
    };

    boardDiv.addEventListener('click', clickHandler)
    modalCloseButton.addEventListener('click', () => {
        settingsModal.style.display = "none";
    });
    submitButton.addEventListener('click', (event) => {
        event.preventDefault();
        settingsModal.style.display = "none";
        gameSettings.reset();
     
    });

    return {
        updateDisplay,
        getGameMode,
        clickHandler,
        settingsModalHandler
    };
})();

const Player = (name, marker) => {

    const getName = () => name;
    const getMarker = () => marker;


    return {getName, getMarker};

};

gameBoard.getBoard();
const Trevor = Player('Trevor', 'O');
displayController.updateDisplay();
displayController.settingsModalHandler();