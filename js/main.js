(function(){
    let newGame = document.querySelector('.btn-game');
    let board = document.querySelector('.board');
    let difficulties = document.querySelector('.difficulties');
    let cardStyles = document.querySelector('.card-styles');
    let cardsNumber;
    let removeActive = function(elems) {
        for (let i =0; i < elems.length; i++) {
            elems[i].classList.remove('active');
        }
    }

    // class Field {
    //     constructor() {
    //         this.cardsNumber;
    //         this.guessedCards = [];
    //     }
    // }

    class Card {
        constructor(cardId, div) {
            this._cardId = cardId;
            this._field = field;
            this._guessed = false;
            this._div = div;
        }
        tryToTurn() {
            console.log(`try to turn`)
        }
    }

    // game settings

    cardStyles.addEventListener('click', event => {
        let lis = cardStyles.children;
        removeActive(lis);

        let li = event.target;
        if (li != lis[0]) li.classList.add('active');
    });

    difficulties.addEventListener('click', event => {
        let lis = difficulties.children;
        removeActive(lis);

        let li = event.target;
        if (li != lis[0]) li.classList.add('active');
        switch (li) {
            case lis[0]:
                break;
            case lis[1]:
                cardsNumber = 10;
                break;
            case lis[2]:
                cardsNumber = 18;
                break;
            case lis[3]:
                cardsNumber = 24;
                break;
        }
    });

    //creating new game

    newGame.addEventListener('click', event => {
        event.preventDefault();
        if (board.children.length > 0) 
            board.removeChild(board.firstElementChild);

        let field = document.createElement('div');
        field.classList.add('field');
        switch (cardsNumber) {
            case 10:
                field.classList.add('field-for-10');
                break;
            case 18:
                field.classList.add('field-for-18');
                break;
        }
        board.appendChild(field);

        for (let i = 0; i < cardsNumber; i++) {
            let card = document.createElement('div');
            card.classList.add('card');
            card.addEventListener('click', event => {
                card.classList.add('chosen-card');
            });
            field.appendChild(card);
        }
    })

})();