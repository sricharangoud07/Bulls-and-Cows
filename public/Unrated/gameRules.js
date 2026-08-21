let gameMode = localStorage.getItem('gameMode');
let instructionsDiv = document.querySelector('.instructions-js');
let startButton = document.getElementById('start-game');

if(gameMode == 'untimed'){
    instructionsDiv.innerHTML = `<p>1. The secret number contains <b>4 unique digits and cannot start with 0.</b></p>
    <p>2. The player's guess must also contain <b>4</b> unique digits and cannot start with 0.</p>
    <p>3. <b>Bull🐂</b>: Correct digit in the correct position.</p>
    <p>4. <b>Cow🐄</b>: Correct digit in the wrong position.</p>
    <p>5. The player gets <b>10 attempts</b> and <b>wins by guessing all 4 digits correctly.</b> Invalid guesses don't count as attempts.</p>`;
}else{
    instructionsDiv.innerHTML = `<p>1. The secret number contains <b>4 unique digits and cannot start with 0.</b></p>
    <p>2. The player's guess must also contain <b>4</b> unique digits and cannot start with 0.</p>
    <p>3. <b>Bull🐂</b>: Correct digit in the correct position.</p>
    <p>4. <b>Cow🐄</b>: Correct digit in the wrong position.</p>
    <p>5. The player gets <b>10 attempts</b>, with a <b>1-minute timer for each guess</b>. Invalid guesses do not count as attempts.</p>
    <p>6. The player wins by guessing the secret number correctly <b>(4 Bulls)</b>. The game ends when the player wins, runs out of attempts, or the timer expires.</p>`;
}




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

startButton.addEventListener('click' , () => {
    window.location.href = 'game.html';
});