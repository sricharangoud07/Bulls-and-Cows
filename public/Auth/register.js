let idInput = document.getElementById('userId-js');
let passInput = document.getElementById('password-js');
let submitBtn = document.getElementById('SubmitBtn');

submitBtn.addEventListener('click', async () => {
    let input = idInput.value;
    let password = passInput.value;
    let payload = {
        userName : input,
        password : password
    }
    try{
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        if(!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        console.log('Success:', data);
    }catch(error){
        console.log(error.message);
    }

    try{
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        if(!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        window.location.href = '../index.html';
        console.log('Success:', data);
    }catch(error){
        console.log(error.message);
    }
})
