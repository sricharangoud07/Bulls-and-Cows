game1Button = document.getElementById('game1');
    game1Button.addEventListener('click', () => {
    localStorage.setItem('gameMode', 'untimed');
    window.location.href = 'gameRules.html';
});

game2Button = document.getElementById('game2');
    game2Button.addEventListener('click', () => {
    localStorage.setItem('gameMode', 'timed');
    window.location.href = 'gameRules.html';
});