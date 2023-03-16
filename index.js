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


    const updateDisplay = () => {
        boardDiv.textContent = "";
        const board = gameBoard.getBoard();

        board.forEach(cell => {
            const cellButton = document.createElement('button');
            cellButton.classList.add('cell');
            cellButton.textContent = `${cell[0]}`;
            boardDiv.appendChild(cellButton);
        })

    }
    return {
        updateDisplay
    }
})();

const Player = (name, marker) => {

    const getName = () => name;
    const getMarker = () => marker;


    return {getName, getMarker};

};