(function(){
    let btnNewGame = document.querySelector('.btn-new-game');
    let popup = document.querySelector('.popup');
    let overlay = document.querySelector('.overlay');
    let difficulties = popup.querySelector('.difficulties');
    let cardStyles = popup.querySelector('.card-styles');
    let btnStart = popup.querySelector('.btn-start');
    let board = document.querySelector('.board');
    let cardsNumber = 18;
    let shirtStyle = 1;
    let removeActive = function(elems) {
        for (let i =0; i < elems.length; i++) {
            elems[i].classList.remove('active');
        }
    }
    
    class Field {
        constructor(pairs){
            this.turnedCard = null;
            this.clickable = true;
            this.pairs = pairs;
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
            if (!this.field.clickable) return;
            this.render.classList.toggle('turn');
            let turnedCard = this.field.turnedCard;
            if (turnedCard === null) {
                this.field.turnedCard = this; 
            } else {
                this.field.clickable = false;
                if (this.cardId === turnedCard.cardId) {
                    this.guessed = true;
                    turnedCard.guessed = true;

                    // find out how to unsubscribe
                    //
                    // this.render.removeEventListener('click', this.turn);
                    // turnedCard.render.removeEventListener('click', this.turn);
                    setTimeout( () => {
                        this.render.classList.add('hide');
                        turnedCard.render.classList.add('hide');
                        this.field.clickable = true;

                        this.field.pairs -= 1;
                        if (this.field.pairs === 0) {
                            setTimeout( () => {
                                alert('You win');
                            }, 1300);
                        }
                    }, 600);

                    this.field.turnedCard = null;

                } else {
                    setTimeout( () => {
                        this.render.classList.toggle('turn');
                        turnedCard.render.classList.toggle('turn');
                        this.field.clickable = true;
                    }, 1000);
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

        let myEvent = new Event('click');
        if(event.keyCode === 13 || event.keyCode === 32) {
            if( popup.classList.contains('show-anim') ) {
                btnStart.dispatchEvent(myEvent);
            }
        }
    });
    
    overlay.addEventListener('click', function(event){
        if( popup.classList.contains('show-anim') ) {
            popup.classList.remove('show-anim');
            overlay.classList.remove('show');
        }
    });

    // game settings

    cardStyles.addEventListener('click', event => {
        let lis = cardStyles.children;
        removeActive(lis);

        let li = event.target;
        li.classList.add('active');
        switch (li) {
            case lis[0]:
                shirtStyle = 1;
                break;
            case lis[1]:
                shirtStyle = 2;
                break;
            case lis[2]:
                shirtStyle = 3;
                break;
        }
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
        console.log('creating the game', shirtStyle, cardsNumber)
        event.preventDefault();
        if (board.children.length > 0) {
            board.removeChild(board.firstElementChild);
        }
        let fieldRender = document.createElement('div');
        fieldRender.classList.add('field');

        let field = new Field(cardsNumber / 2);

        switch (cardsNumber) {
            case 10:
                fieldRender.classList.add('field-for-10');
                break;
            case 18:
                fieldRender.classList.add('field-for-18');
                break;
        }
        board.appendChild(fieldRender);
        const cardIds = [];

        const POKEMON_NUMBER = 917;
        for (let i = 0; i < cardsNumber / 2; i++) {
            let temp = Math.floor( Math.random() * POKEMON_NUMBER );
            cardIds.push(temp, temp);
        }
        const randomSort = function(){
            return Math.random() - 0.5;
        }
        for (let i = 0; i < 5; i++) {
            cardIds.sort(randomSort);
        }
        
        for (let i = 0; i < cardsNumber; i++) {
            let cardRender = document.createElement('div');
            cardRender.classList.add('card');

            let card = new Card(cardIds[i], field, cardRender);

            let cardShirt = document.createElement('div');
            cardShirt.classList.add('card-shirt');
            switch (shirtStyle) {
                case 1:
                    cardShirt.classList.add('shirt-style-1');
                    break;
                case 2:
                    cardShirt.classList.add('shirt-style-2');
                    break;
                case 3:
                    cardShirt.classList.add('shirt-style-3');
                    break;
            }


            let cardBack = document.createElement('div');
            cardBack.classList.add('card-back');

            let spriteDiv = document.createElement('div');
            const SPRITE_WIDTH = 96;
            const SPRITE_HEIGHT = 96;
            const N_COLUMNS = 30;
            
            let posY = Math.floor(cardIds[i] / N_COLUMNS) * SPRITE_HEIGHT;
            let posX = (cardIds[i] % N_COLUMNS) * SPRITE_WIDTH;
            spriteDiv.style.backgroundPosition = `-${posX}px -${posY}px`;
            cardBack.appendChild(spriteDiv);

            cardRender.appendChild(cardShirt);
            cardRender.appendChild(cardBack);
            
            cardRender.addEventListener('click',() => card.tryToTurn());

            fieldRender.appendChild(cardRender);
        }

        popup.classList.remove('show-anim');
        overlay.classList.remove('show');
    })

})();