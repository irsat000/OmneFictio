
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
        .then((res) => res.json())
        .then((data) => {
            if (data.statusCode === 200) {
                success.innerHTML = "SUCCESS";
                setTimeout(function() {
                    window.location.href = "https://localhost:7067/";
                }, 500);
            }
            else if(response.status === 202){
                success.innerHTML = "Success! You can login now";
                setTimeout(function() {
                    window.location.href = "https://localhost:7067/";
                }, 500);
            }
            else if(response.status === 400){
                success.innerHTML = "Check the form again";
                setTimeout(function() {
                    window.location.href = "https://localhost:7067/";
                }, 500);
            }
            else{
                message.innerHTML = "Username already taken";
            }
        })
        .catch(error => console.log('Register function failed.', error));
    });
});