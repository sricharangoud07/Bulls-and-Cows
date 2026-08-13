let feedback = document.getElementById('feedback');
let submitButton = document.getElementById('submitGuess');
let input = document.getElementById('guessInput');
let giveUpButton = document.getElementById('giveUp');
let triesLeft = document.querySelector('.tries-left');
let recordLog = document.querySelector('.record-log');

let cnt = 10;
let gameOver = false;


function randomDigitGenerator() {
    return Math.floor(Math.random() * 10);
}


function generateSecretNumber() {

    let firstDigit = randomDigitGenerator();

    while (firstDigit === 0) {
        firstDigit = randomDigitGenerator();
    }

    let secondDigit = randomDigitGenerator();

    while (secondDigit === firstDigit) {
        secondDigit = randomDigitGenerator();
    }

    let thirdDigit = randomDigitGenerator();

    while (
        thirdDigit === firstDigit ||
        thirdDigit === secondDigit
    ) {
        thirdDigit = randomDigitGenerator();
    }

    let fourthDigit = randomDigitGenerator();

    while (
        fourthDigit === firstDigit ||
        fourthDigit === secondDigit ||
        fourthDigit === thirdDigit
    ) {
        fourthDigit = randomDigitGenerator();
    }

    return `${firstDigit}${secondDigit}${thirdDigit}${fourthDigit}`;
}


function restartGame() {

    input.style.display = 'none';
    
    submitButton.innerHTML = "Restart Game";
    
    submitButton.addEventListener('click', () => {
        window.location.reload();
    });
    
    giveUpButton.innerHTML = 'Return Home';

    giveUpButton.addEventListener('click', () => {
        window.location.href = '../index.html';
    });
}

function bullsandcows(guess, secretNumber) {
    if (gameOver) {
        return;
    }

    // Validate input
    if (!/^\d{4}$/.test(guess)) {

        feedback.textContent =
            "Please enter a valid 4-digit number.";

        input.value = "";

        return;
    }


    // Check repeated digits
    if (new Set(guess).size !== 4) {

        feedback.textContent =
            "Digits cannot repeat.";

        input.value = "";

        return;
    }


    // First digit cannot be zero
    if (guess[0] === "0") {

        feedback.textContent =
            "The first digit cannot be 0.";

        input.value = "";

        return;
    }


    let bulls = 0;
    let cows = 0;


    // Calculate Bulls and Cows
    for (let i = 0; i < 4; i++) {

        if (guess[i] === secretNumber[i]) {

            bulls++;

        } else if (secretNumber.includes(guess[i])) {

            cows++;
        }
    }

    recordLog.style.display = 'inline-block';
    
    // Correct answer
    
    // Wrong answer
    cnt--;
    triesLeft.innerHTML = `<p>Tries Left: ${cnt}</p>`;
    if (guess === secretNumber) {
        feedback.textContent =
        "Congratulations🥳 You guessed the number.";
        
        document.querySelector('.bulls-and-cows').innerHTML +=
        `<p>${guess} - 🐂: 4, 🐄: 0</p>`;

        gameOver = true;
        
        restartGame();
        
        return;
    }

    // Game over
    if (cnt === 0) {
        
        feedback.innerHTML =
        `<p>You lost🤡 The secret number was ${secretNumber}.</p>`;
        
        document.querySelector('.bulls-and-cows').innerHTML +=
        `<p>The secret number was ${secretNumber}.</p>`;
        
        gameOver = true;
        restartGame();
        
        return;
    }
    

    feedback.textContent = `${guess} - 🐂: ${bulls}, 🐄: ${cows}, Tries left: ${cnt}`;


    document.querySelector('.bulls-and-cows').innerHTML +=`<p>${guess} - 🐂: ${bulls}, 🐄: ${cows}</p>`;

    input.value = "";
}


const secretNumber = generateSecretNumber();

console.log(`Secret Number: ${secretNumber}`);


submitButton.addEventListener('click', () => {

    bullsandcows(input.value, secretNumber);

});


giveUpButton.addEventListener('click', () => {
    if (gameOver) {
        return;
    }

    feedback.innerHTML =
        `<p>You gave up😢 The secret number was ${secretNumber}.</p>`;

    input.value = "";

    gameOver = true;

    restartGame();

});


input.addEventListener('keydown', (event) => {

    if (event.key === 'Enter') {

        event.preventDefault();

        bullsandcows(input.value, secretNumber);

    }
});
