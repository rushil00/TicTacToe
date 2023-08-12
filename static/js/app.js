/*const menu = document.querySelector(".menu");
menuItems = menu.querySelector(".items");
menu.addEventListener("click", (event) => {
    menuItems.classList.toggle('hidden');
})*/

//more efficient and BEST practice to write a JavaScript code! 

const App= {
    $: {
        menu: document.querySelector('[data-id = "menu"]'),
        menuItems: document.querySelector('[data-id = "menu-items"]'),
        resetbtn: document.querySelector('[data-id = "reset-btn"]'),
        newroundbtn: document.querySelector('[data-id = "new-round-btn"]') ,
        squares: document.querySelectorAll('[data-id= "square"]'),
        modal: document.querySelector('[data-id="modal"]'),
        modalTxt: document.querySelector('[data-id="modal-text"]'),
        modalBtn: document.querySelector('[data-id="modal-btn"]'),
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
                const icon = document.createElement('i');
                if (currentPlayer === 1){
                    icon.classList.add('fa-solid', 'fa-x','yellow'); 
                }
                else {
                    icon.classList.add('fa-solid', 'fa-o','turqoise');
                }
                App.state.moves.push({
                    squareId: +square.id, 
                    playerId: currentPlayer,
                });
                //App.state.currentPlayer= currentPlayer=== 1 ? 2 : 1;
                //console.log(App.state);
                square.replaceChildren(icon);
                /*const icon = document.createElement('i')
                icon.classList.add('fa-solid', 'fa-x','yellow')

                event.target.replaceChildren(icon);*/

                //<i class="fa-solid fa-x yellow"></i>
                //<i class="fa-solid fa-o turqoise"></i>
                //note: event.target will always represent what is "clicked" and this is not the behavior that we want in this case. So we choose a different route.
                
                
                //check if there is a winner or a tie game
                const game = App.getGameStatus(App.state.moves);
                 
                //console.log(game);
                if(game.status === 'complete'){
                    let message ="";
                    App.$.modal.classList.remove("hidden");
                    
                    if(game.winner){
                        message = `Player ${game.winner} wins!`;
                        //alert(`Player ${status.winner} wins!`);
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