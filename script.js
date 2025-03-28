const table = [];


function gameBoard(){

}


playerOne = [];
p2 = []

function playerTwo(){
    const choices = [];
}

function check (){
    
}
function shifts (p1,p2) {
    while(!gameLogic()){
    for (let i = 0; i < 9; i++){
            if (i% 2 === 0){
                const val = prompt("Player 1, enter a number between 1 and 9");
                p1.push(val);
            } else {
                const val = prompt("Player 2, enter a number between 1 and 9");
                p2.push(val);
            }
        }
    }
    if (gameLogic()){
        console.log("You win");
    } else {
        console.log("You lose");
    }
}
function gameLogic (){
    const choices = [1, 5,9 ];
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
    return winingCombs.some(comb => comb.every(num => choices.includes(num)));


}

console.log(gameLogic());
shifts(playerOne, p2);