document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById('startButton');
    const restartButton = document.getElementById('restartButton');
    const popup = document.getElementById('popup');
    const endPopup = document.getElementById('endPopup');
    const game = document.getElementById('game');
    const matrix = document.getElementById('matrix');
    const timeTaken = document.getElementById('timeTaken');
    const matrixSizeSelect = document.getElementById('matrixSize');
    let startTime;
    let currentNumber = 1;
    let matrixSize;
    let gridSize;

    startButton.addEventListener('click', () => {
        matrixSize = parseInt(matrixSizeSelect.value);
        gridSize = Math.sqrt(matrixSize);
        popup.classList.add('hidden');
        game.classList.remove('hidden');
        startGame();
    });

    restartButton.addEventListener('click', () => {
        endPopup.classList.add('hidden');
        popup.classList.remove('hidden');
        resetGame();
    });

    function startGame() {
        matrix.innerHTML = '';
        matrix.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
        matrix.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
        const numbers = shuffle(Array.from({ length: matrixSize }, (_, i) => i + 1));
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
            if (currentNumber > matrixSize) {
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

    function resetGame() {
        game.classList.add('hidden');
        matrix.innerHTML = '';
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('service-worker.js').then(registration => {
        console.log('Service Worker registrado com sucesso:', registration);
      }).catch(error => {
        console.log('Falha ao registrar o Service Worker:', error);
      });
    });
  }
