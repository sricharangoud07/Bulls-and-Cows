getStartedButton = document.getElementById('getStarted');
getStartedButton.addEventListener('click', () => {
    window.location.href = 'gameModes.html';
});
    

async function loadUser() {
    const response = await fetch('/me');
    const data = await response.json();

    const loggedOut = document.getElementById('loggedOut');
    const loggedIn = document.getElementById('loggedIn');

    if (!data.loggedIn) {
        loggedOut.style.display = 'flex';
        loggedIn.style.display = 'none';
        return;
    }

    loggedOut.style.display = 'none';
    loggedIn.style.display = 'flex';

    document.getElementById('Profile-Name').innerText = data.userName;
}

loadUser();