let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('.reset');
let letter = document.querySelector('.letter');
let winner = document.querySelector('.winner');
let turn = document.querySelector('.turn');

let turn0 = true; // true = 0 turn , false = X turn

let winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
letter.innerHTML = 'O';

let start = 0;
boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if (!box.classList.contains('clicked')) {
            if (turn0) {
                box.innerHTML = 'O';
                turn0 = false;
            } else {
                box.innerHTML = 'X';
                turn0 = true;
            }
            box.classList.add('clicked');
            checkWinner(box.innerHTML);
            checkDraw();
        }
    });
})

function checkDraw() {
    start++;
    if(start === 9) {
        letter.textContent = '';
        turn.textContent= 'Match Draw';
        winner.classList.add('winner-text');
    }
}
function checkWinner(item) {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (boxes[a].innerHTML && boxes[a].innerHTML === boxes[b].innerHTML && boxes[a].innerHTML === boxes[c].innerHTML) {
            boxes.forEach((box) => {
                box.classList.add('clicked');
            });
            boxes[a].classList.add('win-pattern');
            boxes[b].classList.add('win-pattern');
            boxes[c].classList.add('win-pattern');
            winner.classList.add('winner-text');
            letter.textContent = `${item}`;
            turn.textContent= ` is the Winner!`;
            resetBtn.innerHTML = 'New Game';
            start = 0;
            return;
        }
        else {
            if (turn0) {
                letter.innerHTML = 'O';
            } else {
                letter.innerHTML = 'X';
            }
        }
    }
}

resetBtn.addEventListener('click', () => {
    boxes.forEach((box) => {
        box.innerHTML = '';
        box.classList.remove('clicked');
        box.classList.remove('win-pattern');
    });

    letter.innerHTML = 'O';  
    turn.textContent = "'s Turn";  
    resetBtn.innerHTML = 'Reset Game';
    winner.classList.remove('winner-text');
    start = 0;

    turn0 = true;
});

