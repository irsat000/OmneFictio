
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
        
        //Input validation
        const usernameRegex = new RegExp("[A-Za-z0-9_]{3,30}");
        var username = document.getElementById("rm-username").value;
        var pw1 = document.getElementById("rm-pw").value;
        var pw2 = document.getElementById("rm-pwconfirm").value;
        console.log("uname=" + username + " pw1="+pw1+" pw2="+ pw2);
        if(!usernameRegex.test(username)){
            message.innerHTML = "*Username is not acceptable*";
            return;
        }
        else if(/\s/g.test(pw1) || pw1.length < 6){
            message.innerHTML = "*Password is not acceptable*";
            return;
        }
        else if(pw1 !== pw2){
            message.innerHTML = "*Passwords don't match*";
            return;
        }
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
                }, 500);
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
        .catch(error => console.log('Login function failed.', error));
    });
});