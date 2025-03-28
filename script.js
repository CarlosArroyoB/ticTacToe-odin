const table = [

];


function gameBoard(){
    return {matriz: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ],
    imprimir() {
        this.matriz.forEach(row => console.log(row.join(' ')));
    }
}
}


let playerOne = [1,2,9];
const p2 = [4,5,6]


function check (){
    
}
function shifts (p1,p2) {
   
                
        if (gameLogic(p1)){
            console.log("Player 1 wins")
            
        }
        
        else if (gameLogic(p2)){
            console.log("Player 2 wins")
        }
}
    
            
       

//funcion que indica quien gana si es TRUE
function gameLogic (player){

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
    return winingCombs.some(comb => comb.every(num => player.includes(num)));
}

shifts(playerOne,p2);
console.log(gameBoard().matriz);
console.log(gameBoard().imprimir());
