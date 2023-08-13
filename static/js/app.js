/*const menu = document.querySelector(".menu");
menuItems = menu.querySelector(".items");
menu.addEventListener("click", (event) => {
    menuItems.classList.toggle('hidden');
})*/

import View from './view.js';
import Store from './store.js';

//more efficient and BEST practice to write a JavaScript code! 
//represents controller in MVC pattern
/*const App= {
    $: {
        menu: document.querySelector('[data-id = "menu"]'),
        menuItems: document.querySelector('[data-id = "menu-items"]'),
        resetbtn: document.querySelector('[data-id = "reset-btn"]'),
        newroundbtn: document.querySelector('[data-id = "new-round-btn"]') ,
        squares: document.querySelectorAll('[data-id= "square"]'),
        modal: document.querySelector('[data-id="modal"]'),
        modalTxt: document.querySelector('[data-id="modal-text"]'),
        modalBtn: document.querySelector('[data-id="modal-btn"]'),
        turn: document.querySelector('[data-id="turn"]')
    },
    state: {  
        moves: [], 
    },
    getGameStatus(moves){
        const p1Moves = moves.filter(move  => move.playerId ===1).map(move => +move.squareId)
        const p2Moves = moves.filter(move => move.playerId === 2).map(move => +move.squareId)

        const winningPatterns = [
            [1,2,3],
            [1,5,9],
            [1,4,7],
            [2,5,8],
            [3,6,9],
            [3,5,7],
            [4,5,6],
            [7,8,9],
        ];

        let winner =null

        winningPatterns.forEach(pattern=> {
            const p1Wins = pattern.every(v=> p1Moves.includes(v))
            const p2Wins = pattern.every(v=> p2Moves.includes(v))
            if(p1Wins) winner =1
            if(p2Wins) winner =2
        })

        

        return {
            status: moves.length === 9 || winner != null? 'complete':'in-progress',
            winner
        }
    },

    init(){
        App.registeredEventListeners();
    },
    registeredEventListeners() { //init is goint to store all the functions and operations.
        //DONE - Toggling the menu
        App.$.menu.addEventListener("click",(event)=>{
            App.$.menuItems.classList.toggle("hidden");
        });
        //TODO
        App.$.resetbtn.addEventListener('click',event=>{
            console.log('Reset the Game!');
        });
        //TODO  
        App.$.newroundbtn.addEventListener('click', event=>{
            console.log('Start New Round!');
        });
        //TODO

        //now we have to hook a click listener on each of the squares
        App.$.squares.forEach(square=> {
            square.addEventListener('click', event=>{
                
                //Check if there is already a play, and if so, return early.
                
                const hasMove = (squareId) => {
                    const existingMove = App.state.moves.find(move => move.squareId === squareId); 
                    return existingMove !== undefined;
                }
                
                if (hasMove(+square.id)){
                    return;
                }
                //get current player, add the icon to the div.
                const lastMove = App.state.moves.at(-1);
                const getOppositePlayer = (playerId)=> (playerId === 1 ? 2 : 1); 
                //determine which player icon to add to the square   
                const currentPlayer= App.state.moves.length === 0 ? 1 : getOppositePlayer(lastMove.playerId);
                
                const nextPlayer = getOppositePlayer(currentPlayer);
                const turnIcon = document.createElement("i");
                const squareIcon =document.querySelector('i');
                const turnLabel = document.createElement("p");
                turnLabel.innerText = `Player ${nextPlayer}, you're up!`;
                
                if (currentPlayer === 1){
                    turnIcon.classList.add('fa-solid', 'fa-x','yellow'); 
                    squareIcon.classList.add('fa-solid', 'fa-o','turqoise'); 
                    turnLabel.classList = 'turqoise';
                }
                else {
                    turnIcon.classList.add('fa-solid', 'fa-o','turqoise');
                    squareIcon.classList.add('fa-solid', 'fa-x','yellow');
                    turnLabel.classList = 'yellow';
                }
                App.$.turn.replaceChildren(turnIcon ,turnLabel);
                App.state.moves.push({
                    squareId: +square.id, 
                    playerId: currentPlayer,
                });

                square.replaceChildren(squareIcon);

                
                //check if there is a winner or a tie game
                const game = App.getGameStatus(App.state.moves);
                 
                if(game.status === 'complete'){
                    let message ="";
                    App.$.modal.classList.remove("hidden");
                    
                    if(game.winner){
                        message = `Player ${game.winner} wins!`;
                    }
                    else {
                        message = `Tie game!`;
                        //alert("tie!");
                    }
                    App.$.modalTxt.textContent = message;
                }
                console.log(game);
            });
        });
        App.$.modalBtn.addEventListener('click', (event) =>{
            App.state.moves = [];
            App.$.squares.forEach(square => square.replaceChildren());
            App.$.modal.classList.add('hidden');
        });
    },
};

window.addEventListener("load", App.init);
*/


const players = [
    {
        id: 1,
        name: "Player 1",
        iconClass: "fa-x",
        colorClass: "turqoise",
    },
    {
        id: 2,
        name: "Player 2",
        iconClass: "fa-o",
        colorClass: "yellow",
    }
];


function init() {
    const view = new View();
    const store = new Store(players);

    console.log(store.game);    

    view.bindGameResetEvent(event => {
        view.closeAll();

        store.reset();
        view.clearMoves();
        view.setTurnIndicator(store.game.currentPlayer); 
    });
    view.bindNewRoundEvent(event => {
        console.log('NewRoundEvent');
        console.log(event);
    });    
    view.bindPlayerMoveEvent((square) => {
        

        const existingMove = store.game.moves.find(
          (move) => move.squareId === +square.id
        );
    
        if (existingMove) {
          return;
        }
        view .handlePlayerMove(square, store.game.currentPlayer);
        // Advance to the next state by pushing a move to the moves array
        store.playerMove(+square.id);
        view.setTurnIndicator(store.game.currentPlayer);

        if(store.game.status.isComplete){
            view.openModal(
            store.game.status.winner? `${store.game.status.winner.name} Wins!`
            : 'Tie');
            return ;
        }

      });
      
    //console.log(view.$.turn);
}
window.addEventListener("load" , init);
