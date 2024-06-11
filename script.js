document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById('startButton');
    const restartButton = document.getElementById('restartButton');
    const popup = document.getElementById('popup');
    const endPopup = document.getElementById('endPopup');
    const game = document.getElementById('game');
    const matrix = document.getElementById('matrix');
    const timeTaken = document.getElementById('timeTaken');
    let timer;
    let startTime;
    let currentNumber = 1;

    startButton.addEventListener('click', () => {
        popup.classList.add('hidden');
        game.classList.remove('hidden');
        startGame();
    });

    restartButton.addEventListener('click', () => {
        endPopup.classList.add('hidden');
        game.classList.remove('hidden');
        startGame();
    });

    function startGame() {
        matrix.innerHTML = '';
        const numbers = shuffle(Array.from({ length: 49 }, (_, i) => i + 1));
        numbers.forEach(number => {
            const button = document.createElement('button');
            button.textContent = number;
            button.addEventListener('click', () => handleButtonClick(button, number));
            matrix.appendChild(button);
        });
        currentNumber = 1;
        startTime = new Date();
    }

    function handleButtonClick(button, number) {
        if (number === currentNumber) {
            button.classList.add('clicked');
            button.disabled = true;
            currentNumber++;
            if (currentNumber > 49) {
                endGame();
            }
        }
    }

    function endGame() {
        const endTime = new Date();
        const totalTime = ((endTime - startTime) / 1000).toFixed(2);
        timeTaken.textContent = totalTime;
        game.classList.add('hidden');
        endPopup.classList.remove('hidden');
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
});
