function randomDigitGenerator(){
    return Math.floor(Math.random()*10);
}

function generateSecretNumber(){
    let firstDigit = randomDigitGenerator();
    while(firstDigit === 0){
        firstDigit = randomDigitGenerator();
    }
    let secondDigit = randomDigitGenerator();
    while(secondDigit === firstDigit){
        secondDigit = randomDigitGenerator();
    }
    let thirdDigit = randomDigitGenerator();
    while(thirdDigit === firstDigit || thirdDigit === secondDigit){
        thirdDigit = randomDigitGenerator();
    }
    let fourthDigit = randomDigitGenerator();
    while(fourthDigit === firstDigit || fourthDigit === secondDigit || fourthDigit === thirdDigit){
        fourthDigit = randomDigitGenerator();
    }
    return `${firstDigit}${secondDigit}${thirdDigit}${fourthDigit}`;
}

let feedback = document.getElementById('feedback');

function bullsandcows(guess , secretNumber){
    if(guess.length !== 4 || isNaN(guess)){
        feedback.textContent = "Please enter a valid 4-digit number.";
        return;
    }
    if(guess === secretNumber){
        feedback.textContent = "Congratulations! You guessed the number.";
    } else {
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
        feedback.textContent = `Bulls: ${bulls}, Cows: ${cows}`;
    }
    input.value = ``;
}

const secretNumber = generateSecretNumber();
console.log(secretNumber);


let submitButton = document.getElementById('submitGuess');
let input = document.getElementById('guessInput');

submitButton.addEventListener('click',() => bullsandcows(input.value, secretNumber));
input.addEventListener('keypress', (event) => {
    if(event.key === 'Enter'){
        bullsandcows(input.value, secretNumber);
    }
});