let feedback = document.getElementById('feedback');
let submitButton = document.getElementById('submitGuess');
let input = document.getElementById('guessInput');
let giveUpButton = document.getElementById('giveUp');
let triesLeft = document.querySelector('.tries-left');
let recordLog = document.querySelector('.record-log');


function randomDigitGenerator(){
    return Math.floor(Math.random()*10);
}

function generateSecretNumber(){
    let firstDigit = randomDigitGenerator();
    while(firstDigit === 0){
        firstDigit = randomDigitGenerator();
    }
    let secondDigit = randomDigitGenerator();
    while(secondDigit === firstDigit && Math.abs(firstDigit - secondDigit) < 2){
        secondDigit = randomDigitGenerator();
    }
    let thirdDigit = randomDigitGenerator();
    while(thirdDigit === firstDigit || thirdDigit === secondDigit && Math.abs(thirdDigit - secondDigit) < 2){
        thirdDigit = randomDigitGenerator();
    }
    let fourthDigit = randomDigitGenerator();
    while(fourthDigit === firstDigit || fourthDigit === secondDigit || fourthDigit === thirdDigit && Math.abs(fourthDigit - thirdDigit) < 2){
        fourthDigit = randomDigitGenerator();
    }
    return `${firstDigit}${secondDigit}${thirdDigit}${fourthDigit}`;
}

function restartGame(){
    guessInput.style.display = 'none';
    giveUpButton.style.display = 'none';
    submitButton.innerHTML = "Restart Game";
    submitButton.addEventListener('click', () => {
        window.location.reload();
    });
}


function bullsandcows(guess , secretNumber){
    recordLog.style.display = 'inline-block';
    if(cnt === 0){
        feedback.innerHTML = `<p>Game Over! The secret number was ${secretNumber}.</p>`;
        input.value = ``;
        restartGame();
        return;
    }
    if(guess.length !== 4 || isNaN(guess)){
        feedback.textContent = "Please enter a valid 4-digit number.";
        input.value = ``;
        return;
    }
    if(guess === secretNumber){
        feedback.textContent = "Congratulations! You guessed the number.";
        restartGame();
    } else {
        cnt--;
        let bulls = 0;
        let cows = 0;
        for(let i = 0 ; i < 4 ; i++){
            if(guess[i] === secretNumber[i]){
                bulls++;
            }
        }
        for(let i = 0 ; i < 4 ; i++){
            for(let j = 0 ; j < 4 ; j++){
                if(i != j && guess[i] === secretNumber[j]){
                    cows++;
                }
            }
        }
        feedback.textContent = `${guess} - Bulls: ${bulls}, Cows: ${cows} , Tries left: ${cnt}`;
        triesLeft.innerHTML = `<p>Tries Left: ${cnt}</p>`
        document.querySelector('.bulls-and-cows').innerHTML += `<p>${guess} - Bulls: ${bulls}, Cows: ${cows}</p>`;
    }
    input.value = ``;
}

const secretNumber = generateSecretNumber();


let cnt = 10;
submitButton.addEventListener('click',() => bullsandcows(input.value, secretNumber));
giveUpButton.addEventListener('click', () => {
    feedback.innerHTML = `<p>You gave up! The secret number was ${secretNumber}.</p>`;
    input.value = ``;
    restartGame();
});
input.addEventListener('keypress', (event) => {
    if(event.key === 'Enter'){
        bullsandcows(input.value, secretNumber);
    }
});
