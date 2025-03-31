
const cells = document.querySelectorAll(".cells");


function gameBoard(){
    return {matriz: ["-", "-", "-", "-", "-", "-", "-", "-", "-"]}
}

const player = (function() {
    return {
        currentPlayer : "X"
    }
})();

const playerBase1 = []
const playerBase2 = []
const mainGame = () =>{
    let contPlayer1 = 0;
    let contPlayer2 = 0;
    const updateBoard  =() =>{
        cells.forEach((cell,index)=>{
            cell.textContent = gameBoard().matriz[index]
        })
    }

    //funcion que indica quien gana si es TRUE
    const winsLogic = (playerBoard) =>{

        const winingCombs = [
            [1,2,3],
            [4,5,6],
            [7,8,9],
            [1,5,9],
            [3,5,7],
            [1,4,7],
            [2,5,8],
            [3,6,9],
        ]
        const winner = winingCombs.some(comb => comb.every(num => playerBoard.includes(num)));
        return winner;
    }
    
    const endGame = (p1, p2) => {
        if (winsLogic(p1)) {
            console.log("Player 1 wins");
            alert("Player 1 wins!");
            contPlayer1++;
            document.getElementById("scorePlayer1").textContent = contPlayer1; // Actualiza la puntuación en pantalla
            return true; // Detén el juego
        } else if (winsLogic(p2)) {
            console.log("Player 2 wins");
            alert("Player 2 wins!");
            contPlayer2++;
            document.getElementById("scorePlayer2").textContent = contPlayer2; // Actualiza la puntuación en pantalla
            return true; // Detén el juego
        } else if (p1.length == 5) {
            console.log("EMPATE");
            alert("EMPATE");
            return true; // Detén el juego
        }
        return false; // Continúa el juego si no hay ganador
    };
    const createPlays = (id)=>{
        const cellNumber = parseInt(id, 10);
        if (player.currentPlayer === 'X') {
            if (!playerBase1.includes(cellNumber) && !playerBase2.includes(cellNumber)) {
                playerBase1.push(cellNumber); // Agrega el número a playerBase1
                
            }
        } else if (player.currentPlayer === 'O') {
            if (!playerBase2.includes(cellNumber) && !playerBase1.includes(cellNumber)) {
                playerBase2.push(cellNumber); // Agrega el número a playerBase2
                
            }
        }
        
    }

    const restartGame = () => {
        // Vaciar los arreglos de movimientos
        playerBase1.length = 0;
        playerBase2.length = 0;
    
        // Reiniciar el tablero visual
        board.matriz = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];
        cells.forEach(cell => {
            cell.textContent = "-";
            cell.removeEventListener("click", handleClick); // Elimina los eventos existentes
        });
    
        // Reactivar los clics en las celdas
        play();
    };
    const switchPlayer = () => {
        player.currentPlayer = player.currentPlayer === "X" ? "O" : "X";
    }

    return {updateBoard, winsLogic,switchPlayer,endGame, createPlays,restartGame, contPlayer1,contPlayer2}
}

const game = mainGame()
const board= gameBoard();

const handleClick = function (event) {
    event.preventDefault();

    const cell = event.target;
    const index = Array.from(cells).indexOf(cell); // Obtén el índice de la celda clicada
    const cellId = cell.id;

    if (board.matriz[index] === "-") {
        // Actualiza el tablero y registra el movimiento
        board.matriz[index] = player.currentPlayer;
        cell.textContent = player.currentPlayer;
        game.createPlays(cellId);

        console.log(playerBase1);
        console.log(playerBase2);

        // Verifica si el juego ha terminado
        if (game.endGame(playerBase1, playerBase2)) {
            // Desactiva los clics en todas las celdas
            cells.forEach(cell => cell.removeEventListener("click", handleClick));
        } else {
            // Cambia de jugador si el juego no ha terminado
            game.switchPlayer();
        }
    } else {
        console.log("Esta celda ya está ocupada.");
    }
    document.getElementById("restartButton").addEventListener("click", () => {
        game.restartGame();
    });
};

const play = () => {
    game.updateBoard();

    // Define la función handleClick fuera del bucle
    

    // Agrega el evento click a cada celda
    cells.forEach(cell => {
        cell.addEventListener("click", handleClick);
    });
};

play();


