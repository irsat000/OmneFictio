
document.addEventListener("DOMContentLoaded", function () {
    //register form - fetch api
    const register_form = document.getElementById('register-form') as HTMLFormElement;
    register_form.addEventListener('submit', async function (event) {
        //disables redirection of form element
        event.preventDefault();
        //Get message elements
        const message = document.getElementById('registerform-message') as HTMLSpanElement;
        //Input validation
        const usernameRegex = new RegExp("[A-Za-z0-9_]{3,30}");
        const username = (<HTMLInputElement>document.getElementById("rm-username")).value;
        const email = (<HTMLInputElement>document.getElementById("rm-email")).value;
        const pw1 = (<HTMLInputElement>document.getElementById("rm-pw")).value;
        const pw2 = (<HTMLInputElement>document.getElementById("rm-pwconfirm")).value;

        message.innerHTML = "";
        message.style.color = "#b22525";
        if (!usernameRegex.test(username)) {
            message.innerHTML = "*Username is not acceptable*";
            return;
        }
        else if (email.length < 3) {
            message.innerHTML = "*Email is not acceptable*";
            return;
        }
        else if (/\s/g.test(pw1) || pw1.length < 6) {
            message.innerHTML = "*Password is not acceptable*";
            return;
        }
        else if (pw1 !== pw2) {
            message.innerHTML = "*Passwords don't match*";
            return;
        }
        
        //Request
        await fetch("/Auth/UserRegistration", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: window.strfForm(register_form)
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.statusCode === 200) {
                    message.style.color = "#36914e";
                    message.innerHTML = "SUCCESS";
                }
                else if (data.statusCode === 202) {
                    message.style.color = "#36914e";
                    message.innerHTML = "Success! You can login now";
                }
                else if (data.statusCode === 409) {
                    message.innerHTML = "Username already taken";
                }
                else if (data.statusCode === 400) {
                    message.innerHTML = "Check the form again";
                }
                else { message.innerHTML = "Error"; }
                
                /*setTimeout(function() {
                    window.location.href = "https://localhost:7067/";
                    I will send the user to previous page if it's a success
                }, 500);*/
            })
            .catch(error => console.log('Register function failed.', error));
    });
});