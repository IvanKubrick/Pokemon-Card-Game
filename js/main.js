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

            let cardShirt = document.createElement('div');
            cardShirt.classList.add('card-shirt');

            let cardBack = document.createElement('div');
            cardBack.classList.add('card-back');

            card.appendChild(cardShirt);
            card.appendChild(cardBack);

            // card.addEventListener('click', event => {
            //     card.classList.add('chosen-card');
            // });
            field.appendChild(card);
        }

        popup.classList.remove('show-anim');
        overlay.classList.remove('show');
    })

})();