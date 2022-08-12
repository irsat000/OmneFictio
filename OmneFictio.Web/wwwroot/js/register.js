
$(document).ready(function(){

    //register form - fetch api
    const register_form = document.getElementById('register-form');
    register_form.addEventListener('submit', async function(event){
        //disables redirection of form element
        event.preventDefault();
        //Get message elements
        const message = document.getElementById('registerform-message');
        const success = document.getElementById('registerform-success');
        message.innerHTML = "";
        //Request
        const payload = JSON.stringify(Object.fromEntries(new FormData(register_form)));
        await fetch("/Auth/UserRegistration", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: payload
        })
        .then(function (response) {
            if (response.ok) {
                success.innerHTML = "SUCCESS";
                setTimeout(function() {
                    window.location.href = "https://localhost:7067/";
                }, 1000);
            }
            else if(response.status === 480){
                message.innerHTML = "Bad username";
            }
            else if(response.status === 481){
                message.innerHTML = "*Username is taken*";
            }
            else if(response.status === 482){
                message.innerHTML = "*Password is not acceptable*";
            }
            else if(response.status === 483){
                message.innerHTML = "*Server error*";
            }
            else{
                message.innerHTML = "*Unknown error*";
            }
        })
        .catch(error => console.log('Login function failed. Should be logged', error));
    });
});