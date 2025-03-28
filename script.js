
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
    
    const endGame = (p1,p2) =>{
        if (winsLogic(p1)) {
            console.log("Player 1 wins");
            alert("Player 1 wins!");
            return true; // Detén el juego
        } else if (winsLogic(p2)) {
            console.log("Player 2 wins");
            alert("Player 2 wins!");
            return true; // Detén el juego
        } else if (p1.length == 5) {
            console.log("EMPATE");
            alert("EMPATE");
            return true; // Detén el juego
        } 
        return false; // Continúa el juego si no hay ganador
    }
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
    const switchPlayer = () => {
        player.currentPlayer = player.currentPlayer === "X" ? "O" : "X";
    }

    return {updateBoard, winsLogic,switchPlayer,endGame, createPlays}
}

const game = mainGame()
const board= gameBoard();

const play = () =>{
    game.updateBoard();
    console.log("El juego comienza. El jugador inicial es: " + player.currentPlayer); // Mensaje inicial
    cells.forEach((cell,index)=>{
        cell.addEventListener("click",function handleClick (event) {
            event.preventDefault();
            
            const cellId = event.target.id;
            game.createPlays(cellId);
            console.log(playerBase1)
            console.log(playerBase2)

            if(board.matriz[index] == "-"){
                board.matriz[index] = player.currentPlayer;
                cell.textContent = player.currentPlayer;

                if (game.endGame(playerBase1, playerBase2)) {
                    cells.forEach(cell => cell.removeEventListener("click", handleClick)); 
                }else{
                    game.switchPlayer();
                }
            }

            
        })
    })
}


play();



