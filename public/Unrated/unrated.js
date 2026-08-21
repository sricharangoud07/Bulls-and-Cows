game1Button = document.getElementById('game1');
    game1Button.addEventListener('click', () => {
    localStorage.setItem('gameMode', 'untimed');
    window.location.href = 'gameRules.html';
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

game2Button = document.getElementById('game2');
    game2Button.addEventListener('click', () => {
    localStorage.setItem('gameMode', 'timed');
    window.location.href = 'gameRules.html';
});