unratedButton = document.getElementById('unrated');
unratedButton.addEventListener('click', () => {
    window.location.href = 'Unrated/unrated.html';
});

ratedButton = document.getElementById('rated');
ratedButton.addEventListener('click', async () => {
    const response = await fetch('/me');

    const data = await response.json();
    
    if (!data.loggedIn) {
        window.location.href = '/Auth/login.html';
        return;
    }
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
    