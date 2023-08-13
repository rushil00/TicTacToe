//represent the view of MVC
export default class View {
    $ = {};
    $$ = {};
    constructor() {
        this.$.menu= this.#qs('[data-id = "menu"]');
        this.$.menuBtn =this.#qs('[data-id="menu-btn"]');
        this.$.menuItems=this.#qs('[data-id = "menu-items"]');
        this.$.resetbtn= this.#qs('[data-id = "reset-btn"]');
        this.$.newroundbtn=this.#qs('[data-id = "new-round-btn"]') ;
        
        this.$.modal=this.#qs('[data-id="modal"]');
        this.$.modalTxt=this.#qs('[data-id="modal-text"]');
        this.$.modalBtn= this.#qs('[data-id="modal-btn"]');
        this.$.turn= this.#qs('[data-id="turn"]');
        
        this.$$.squares= this.#qsAll('[data-id= "square"]');

        //UI only event Listeners:
        this.$.menuBtn.addEventListener("click", event => {
            this.#toggleMenu();
        })
    }


    /* 
    DOM Helper methods 
    */

    bindGameResetEvent(handler){
        this.$.resetbtn.addEventListener('click',handler);
        this.$.modalBtn.addEventListener("click", handler);
    }
    bindNewRoundEvent(handler){
        this.$.newroundbtn.addEventListener("click",handler);
    }
    bindPlayerMoveEvent(handler){
        this.$$.squares.forEach((square) => {
            square.addEventListener("click",() => handler(square));
        });
    }

    openModal(message){
        this.$.modal.classList.remove('hidden');
        this.$.modalTxt.innerText = message;
    }
    closeAll() {
        this.#closeModal();
        this.#closeMenu();
      }
    #closeMenu() {
    this.$.menuItems.classList.add("hidden");
    this.$.menuBtn.classList.remove("border");

    const icon = this.$.menuBtn.querySelector("i");

    icon.classList.add("fa-chevron-down");
    icon.classList.remove("fa-chevron-up");
    }
    #closeModal(){
        this.$.modal.classList.add("hidden");
    }

    clearMoves(){
        this.$$.squares.forEach((square) => {
            square.replaceChildren();
        });
    }

    #toggleMenu(){
        this.$.menuItems.classList.toggle("hidden");
        this.$.menuBtn.classList.toggle("border");
        
        const icon = this.$.menuBtn.querySelector('i');
        icon.classList.toggle("fa-chevron-down");
        icon.classList.toggle("fa-chevron-up");
    }

    handlePlayerMove(squareEl, player){
        const icon = document.createElement("i");
        icon.classList.add("fa-solid", player.iconClass , player.colorClass);
        squareEl.replaceChildren(icon);
    }

    setTurnIndicator(player){
        const icon = document.createElement('i');
        const label = document.createElement('p');
        
        icon.classList.add(player.colorClass);
        label.classList.add(player.colorClass);
        //this.$.turn.classList.remove(opponent.colorClass);

        icon.classList.add('fa-solid',player.iconClass, player.colorClass)
        label.classList.add(player.colorClass)
        label.innerText = `${player.name}, you're up!`
        this.$.turn.replaceChildren(icon, label);

    }

    #qs(selector , parent){
        const el = parent? parent.querySelector(selector): document.querySelector(selector);

        if(!el) throw new Error('Could Not Find Elements');
        
        return el;
    }
    #qsAll(selector){
        const elList = document.querySelectorAll(selector);

        if(!elList) throw new Error('Could Not Find Elements');
        
        return elList;
    }
}
//window.View = View;