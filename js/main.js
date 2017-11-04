(function(){
    let btnNewGame = document.querySelector('.btn-new-game');
    let popup = document.querySelector('.popup');
    let overlay = document.querySelector('.overlay');
    let difficulties = document.querySelector('.difficulties');
    let cardStyles = document.querySelector('.card-styles');
    let btnStart = document.querySelector('.btn-start');
    let board = document.querySelector('.board');
    let cardsNumber = 18;
    let removeActive = function(elems) {
        for (let i =0; i < elems.length; i++) {
            elems[i].classList.remove('active');
        }
    }

    class Field {
        constructor(){
            this.turnedCard = null;

        }
    }

    class Card {
        constructor(cardId, field, render) {
            this.cardId = cardId;
            this.guessed = false;
            this.field = field;
            this.render = render;
        }
        tryToTurn() {
            if (!this.guessed && this != this.field.turnedCard) {
                this.turn();
            }
        }
        turn() {
            this.render.classList.toggle('turn');
            let turnedCard = this.field.turnedCard;
            if (turnedCard === null) {
                this.field.turnedCard = this; 
            } else {
                if (this.cardId === turnedCard.cardId) {
                    this.guessed = true;
                    turnedCard.guessed = true;

                    // find out how to unsubscribe
                    // this.render.removeEventListener('click', this.turn);
                    // turnedCard.render.removeEventListener('click', this.turn);

                    this.render.classList.add('hide');
                    turnedCard.render.classList.add('hide');

                    this.field.turnedCard = null;
                } else {
                    setTimeout( () => {
                        this.render.classList.toggle('turn');
                        turnedCard.render.classList.toggle('turn');
                    }, 500);
                    this.field.turnedCard = null;
                }
            }
                
        }
    }

    //popup

    btnNewGame.addEventListener('click', function(event) {
        event.preventDefault();
        overlay.classList.add('show');
        popup.classList.add('show-anim');
    });

    window.addEventListener('keydown', function(event){
        if(event.keyCode === 27) {
            if( popup.classList.contains('show-anim') ) {
                popup.classList.remove('show-anim');
                overlay.classList.remove('show');
            }
        }
    });

    // game settings

    cardStyles.addEventListener('click', event => {
        let lis = cardStyles.children;
        removeActive(lis);

        let li = event.target;
        li.classList.add('active');
    });

    difficulties.addEventListener('click', event => {
        let lis = difficulties.children;
        removeActive(lis);

        let li = event.target;
        li.classList.add('active');
        switch (li) {
            case lis[0]:
                cardsNumber = 10;
                break;
            case lis[1]:
                cardsNumber = 18;
                break;
            case lis[2]:
                cardsNumber = 24;
                break;
        }
    });

    //creating new game

    btnStart.addEventListener('click', event => {
        event.preventDefault();
        if (board.children.length > 0) 
            board.removeChild(board.firstElementChild);

        let fieldRender = document.createElement('div');
        fieldRender.classList.add('field');

        let field = new Field();

        switch (cardsNumber) {
            case 10:
                fieldRender.classList.add('field-for-10');
                break;
            case 18:
                fieldRender.classList.add('field-for-18');
                break;
        }
        board.appendChild(fieldRender);

        for (let i = 0; i < cardsNumber; i++) {
            let cardRender = document.createElement('div');
            cardRender.classList.add('card');

            let card = new Card(i%2, field, cardRender);

            let cardShirt = document.createElement('div');
            cardShirt.classList.add('card-shirt');

            let cardBack = document.createElement('div');
            cardBack.classList.add('card-back');

            cardRender.appendChild(cardShirt);
            cardRender.appendChild(cardBack);
            
            cardRender.addEventListener('click',() => card.tryToTurn());

            fieldRender.appendChild(cardRender);
        }

        popup.classList.remove('show-anim');
        overlay.classList.remove('show');
    })

})();