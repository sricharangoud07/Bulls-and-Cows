let feedback = document.getElementById('feedback');
let submitButton = document.getElementById('submitGuess');
let input = document.getElementById('guessInput');
let giveUpButton = document.getElementById('giveUp');
let triesLeft = document.querySelector('.tries-left');
let recordLog = document.querySelector('.record-log');
let timerElement = document.querySelector('.timer');

let cnt = 10;
let timer;
let gameOver = false;
let gameMode = localStorage.getItem('gameMode');
if(gameMode === 'untimed'){
    timerElement.style.display = 'none';
}


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

function updateTimer(minuts, seconds){
    let m = String(minuts).padStart(2, '0');
    let s = String(seconds).padStart(2, '0');
    timerElement.innerHTML = `<p>Timer: ${m}:${s}</p>`;
}

function startTimer() {
    let minuts = 1;
    let seconds = 0;
    updateTimer(minuts , seconds);
    timer = setInterval(() => {
        if (seconds === 0) {
            if (minuts === 0) {
                clearInterval(timer);
                feedback.innerHTML = `<p>Time's up! You lost🤡 The secret number was ${secretNumber}.</p>`;
                gameOver = true;
                restartGame();
                return;
            }
            minuts--;
            seconds = 59;
        }else {
            seconds--;
        }
        updateTimer(minuts, seconds);
    },1000);
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


    // Correct answer
    if(gameMode === 'timed') clearInterval(timer);
    
    // Wrong answer
    cnt--;
    recordLog.style.display = 'inline-block';
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
        if(gameMode === 'timed') clearInterval(timer);
        restartGame();
        
        return;
    }
    
    if(gameMode === 'timed') startTimer();
    

    feedback.textContent = `${guess} - 🐂: ${bulls}, 🐄: ${cows}, Tries left: ${cnt}`;


    document.querySelector('.bulls-and-cows').innerHTML += `
    <div class="guess-row">
        <span class="guess-number">${guess}</span>
        <span>🐂 ${bulls}</span>
        <span>🐄 ${cows}</span>
    </div>
`;

    input.value = "";
}


const secretNumber = generateSecretNumber();

console.log(`Secret Number: ${secretNumber}`);


submitButton.addEventListener('click', () => {

    bullsandcows(input.value, secretNumber);

});
if(gameMode === 'timed') startTimer();


giveUpButton.addEventListener('click', () => {
    if(gameMode === 'timed') clearInterval(timer);
    if (gameOver) {
        return;
    }

    feedback.innerHTML =
        `<p>You gave up😢 The secret number was ${secretNumber}.</p>`;

    input.value = "";

    gameOver = true;

    restartGame();

});




async function loadUser() {

    const response = await fetch('/me');
    const loggedOut = document.getElementById('loggedOut')
    const loggedIn = document.getElementById('loggedIn');

    
    const data = await response.json();
    
    if (!data.loggedIn) {
        loggedOut.style.display = 'block';
        loggedIn.style.display = 'none';
        return;
    }
    loggedOut.style.display = 'none';
    loggedIn.style.display = 'block';
    document.getElementById('Profile-Name').innerText = data.userName
}

loadUser();


input.addEventListener('keydown', (event) => {

    if (event.key === 'Enter') {

        event.preventDefault();

        bullsandcows(input.value, secretNumber);

    }
});
