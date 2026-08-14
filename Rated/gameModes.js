let easyButton = document.getElementById('easyMode');
let mediumButton = document.getElementById('mediumMode');
let hardButton = document.getElementById('hardMode');
let veryHardButton = document.getElementById('veryHardMode');
let expertButton = document.getElementById('expertMode');

easyButton.addEventListener('click', () =>{
    localStorage.setItem('gameType' , 'easy');
    window.location.href = 'ratedGame.html';
});
mediumButton.addEventListener('click', () =>{
    localStorage.setItem('gameType' , 'medium');
    window.location.href = 'ratedGame.html';
});
hardButton.addEventListener('click', () =>{
    localStorage.setItem('gameType' , 'hard');
    window.location.href = 'ratedGame.html';
});
veryHardButton.addEventListener('click', () =>{
    localStorage.setItem('gameType' , 'veryHard');
    window.location.href = 'ratedGame.html';
});
expertButton.addEventListener('click', () =>{
    localStorage.setItem('gameType' , 'expert');
    window.location.href = 'ratedGame.html';
});