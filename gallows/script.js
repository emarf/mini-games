let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

function pickWord() {
    let words = [
        "программа",
        "макака",
        "прекрасный",
        "оладушек",
        "блинчик",
        "версия",
        "признак",
        "эйфория",
    ];
    return words[Math.floor(Math.random() * words.length)];
};

function setupAnswerArray(word) {
    let answerArray = [];
    for (let i = 0; i < word.length; i++) {
        answerArray[i] = "_";
    }
    return answerArray;
};

function showPlayerProgress(answerArray) {
    alert(answerArray.join(" "));
};

function getGuess() {
    return prompt("Guess a letter, or click Cancel to stop playing.");
};

function updateGameState(guess, word, answerArray) {
    let appearances = 0;
    for (let j = 0; j < word.length; j++) {
        if (guess === word[j]) {
            answerArray[j] = guess;
            appearances++;
        }
    }
    return appearances;
};

// Теперь асинхронная
async function deadHuman(wrongLetter) {
    // ctx.lineWidth = 4;
    // let arr = [[85, 30], [85, 100], [110, 140], [85, 100], [60, 140], [85, 50],
    // [50, 30], [85, 50], [120, 30]];
    // ctx.beginPath();
    // ctx.moveTo(arr[0][0], arr[0][1]);

    // Проходишь циклом по массиву точек
    // for (let i = 0; i < arr.length; i++) {
    // Если это первая ошибка рисуем голову
    //     if (wrongLetter === 0) {
    //         ctx.strokeRect(75, 10, 20, 20);
    // Если это третья! ошибка, рисуем все остальные точки (на рисунке была лишняя линия)
    //     } else if (wrongLetter > 1) {
    //         ctx.lineTo(arr[i][0], arr[i][1]);
    //         ctx.stroke();
    //     }
    // }

    ctx.lineWidth = 4;

    if (wrongLetter === 0) {
        ctx.strokeRect(20, 20, 20, 20);
    } else if (wrongLetter === 1) {
        ctx.beginPath();
        ctx.moveTo(30, 40);
        ctx.lineTo(30, 80);
        ctx.stroke();
    } else if (wrongLetter === 2) {
        ctx.beginPath();
        ctx.moveTo(30, 80);
        ctx.lineTo(10, 110);
        ctx.stroke();
    } else if (wrongLetter === 3) {
        ctx.beginPath();
        ctx.moveTo(30, 80);
        ctx.lineTo(50, 110);
        ctx.stroke();
    } else if (wrongLetter === 4) {
        ctx.beginPath();
        ctx.moveTo(30, 60);
        ctx.lineTo(10, 50);
        ctx.stroke();
    } else if (wrongLetter === 5) {
        ctx.beginPath();
        ctx.moveTo(30, 60);
        ctx.lineTo(50, 50);
        ctx.stroke();
    }
    // Подождать, чтобы отрисовала
    await sleep();
};

function showAnswerAndCongratulatePlayer(answerArray) {
    if (guesses > 0) {
        alert("Congratulation you won! The word was: " + word);
    } else {
        alert("You lost! The word was: " + word);
    }
}

// Возвращает промис, который выполниться через заданное время
function sleep(milisec = 0) {
    return new Promise(resolve => {
        setTimeout(() => resolve(), milisec);
    });
}

let word = pickWord();
let answerArray = setupAnswerArray(word);
let remainingLetters = word.length;
let guesses = word.length;
// По логике было бы лучше либо начинать с 1, либо увеличивать счётчик перед отрисовкой, чтобы при дебаге было проще
let wrongLetter = 0;

// Теперь асинхронная (см. синтаксис async/await)
// Можно было бы сделать через Promise, но выглядело бы запутанно.
(async function () {
    while (remainingLetters > 0 && guesses > 0) {
        showPlayerProgress(answerArray);
        const guess = getGuess();
        if (guess === null) {
            break;
        } else if (guess.length !== 1) {
            alert("Only one letter");
        } else {
            let correctGuesses = updateGameState(guess, word, answerArray);

            remainingLetters -= correctGuesses;
            guesses--;

            if (correctGuesses === 0) {
                // При первой ошибке отрисовывает имея wrongLetter 0. Это не очевидно
                // Функция deadHuman асинхронная, дожидаемся её выполнения
                await deadHuman(wrongLetter);
                wrongLetter++;
            }
        }
    }
    showAnswerAndCongratulatePlayer(answerArray);
})()
