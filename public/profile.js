async function main(){
    try{
        const user = await fetch('/me');
        if(!user.ok){
            return;
        }
        const data = await user.json();
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
    }catch(error){
        console.log(error.message);
    }
}
main();