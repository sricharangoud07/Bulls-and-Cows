unratedButton = document.getElementById('unrated');
unratedButton.addEventListener('click', () => {
    window.location.href = 'Unrated/unrated.html';
});

ratedButton = document.getElementById('rated');
ratedButton.addEventListener('click', () => {
    window.location.href = 'Rated/rated.html';
});

logoutBtn = document.getElementById('logoutBtn');
logoutBtn.addEventListener('click' , async () => {
    try{
        let response = await fetch('/logout' , {
            method: 'POST'
        });
        let data = await response.json();
        window.location.reload();
        console.log(data.message);

    }catch(error){
        console.log(error.message);
    }
})

async function loadUser() {

    const response = await fetch('/me');

    const loggedOut = document.getElementById('loggedOut');
    const loggedIn = document.getElementById('loggedIn');

    if (!response.ok) {
        loggedOut.style.display = 'block';
        loggedIn.style.display = 'none';
        return;
    }

    const data = await response.json();

    loggedOut.style.display = 'none';
    loggedIn.style.display = 'block';

    document.getElementById('welcome').textContent =
        `Welcome, ${data.userName}`;

    document.getElementById('level').textContent =
        `Level: ${data.level}`;

    document.getElementById('points').textContent =
        `Points: ${data.points}`;

    document.getElementById('gamesPlayed').textContent =
        `Games Played: ${data.gamesPlayed}`;

    document.getElementById('gamesWon').textContent =
        `Games Won: ${data.gamesWon}`;
}

loadUser();
    