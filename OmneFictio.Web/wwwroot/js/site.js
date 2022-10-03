// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.



$(document).ready(function () {
    document.querySelector('.modalbg1').addEventListener("click", function () {
        modalbg1_click();
    });

    /* 
    $('.modalbg1').click( () => {
        Maybe I use it
        if($('.account-dropdown').hasClass('d-block')){
            $('.account-dropdown').removeClass('opacity-100');
            setTimeout(function(){
                $('.account-dropdown').removeClass('d-block');
            }, 100);
        
    });}
    */

    //Top-right account dropdown menu
    $('.ppic-wrap, .dropdown_icon-wrap').click(function () {
        if ($('.account-dropdown').hasClass('d-block')) {
            $('.account-dropdown').removeClass('opacity-100');
            setTimeout(function () {
                $('.account-dropdown').removeClass('d-block');
            }, 100);
        }
        else {
            $('.account-dropdown').addClass('d-block');
            setTimeout(function () {
                $('.account-dropdown').addClass('opacity-100');
            }, 100);
        }
    });

    //Drawer for mobile
    $('.drawerbtn-cont > i, .dw-close > i').click(function () {
        if ($('.drawer').hasClass('drawer-active')) {
            $('.drawer').removeClass('drawer-active');
            $('.modalbg1').removeClass('d-block');
        }
        else {
            $('.drawer').addClass('drawer-active');
            $('.modalbg1').addClass('d-block');
        }
    });

    //Open/close login modal
    $('.login-openbtn, .lm-closebtn').click(function () {
        if ($('#login-modal').hasClass('d-flex')) {
            $('#login-modal').removeClass('d-flex');
            $('#login-modal').removeClass('opacity-100');
            $('.modalbg1').removeClass('d-block');
        }
        else {
            $('#login-modal').addClass('d-flex');
            $('.modalbg1').addClass('d-block');
            setTimeout(function () {
                $('#login-modal').addClass('opacity-100');
            }, 100);
        }
        //Close others after opening login modal
        if ($('.account-dropdown').hasClass('d-block')) {
            $('.account-dropdown').removeClass('opacity-100');
            setTimeout(function () {
                $('.account-dropdown').removeClass('d-block');
            }, 100);
        }
        if ($('.drawer').hasClass('drawer-active')) {
            $('.drawer').removeClass('drawer-active');
        }
    });


    $('body').click(function (event) {
        var target = $(event.target);

        //Close dropdown of account container in header if clicked somewhere else
        if ($('.account-dropdown').hasClass('d-block') && !target.parents('.account-cont').length) {
            $('.account-dropdown').removeClass('opacity-100');
            setTimeout(function () {
                $('.account-dropdown').removeClass('d-block');
            }, 100);
        }
        /*
        if($('.drawer').hasClass('drawer-active') && !target.parents('.drawer').length){
            $('.drawer').removeClass('drawer-active');
            $('.modalbg1').removeClass('d-block');
        }*/
    });

    //Post menu actions
    $('.p-menubtn, .pd-closebtn').click(function () {
        var postwrap = $(this).parent().closest('.post');
        var postdetail = $(postwrap).find('.post-detail');
        var postmenu = $(postwrap).find('.post-menu');
        if ($(postdetail).hasClass('d-flex')) {
            $(postdetail).removeClass('d-flex');
            $(postdetail).addClass('d-none');
            $(postmenu).removeClass('d-none');
            $(postmenu).addClass('d-flex');
        }
        else {
            $(postdetail).removeClass('d-none');
            $(postdetail).addClass('d-flex');
            $(postmenu).removeClass('d-flex');
            $(postmenu).addClass('d-none');
        }
    });
















    //login modal - fetch api
    const login_form = document.getElementById('login-modal');
    login_form.addEventListener('submit', async function (event) {
        //disables redirection of form element
        event.preventDefault();
        //Get message elements
        const message = document.getElementById('loginmodal-message');
        const success = document.getElementById('loginmodal-success');
        message.innerHTML = "";
        //Request
        const payload = JSON.stringify(Object.fromEntries(new FormData(login_form)));
        await fetch("/Auth/UserLogin", {
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
                    setTimeout(function () {
                        location.reload();
                    }, 500);
                }
                else if (response.status === 404) {
                    message.innerHTML = "*User not found*";
                }
                else {
                    message.innerHTML = "*Server error*";
                }
            })
            .catch(error => console.log('Login function failed.', error));
    });


    //Vote - fetch api
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('likebtn') ||
            e.target.classList.contains('dislikebtn')) {
            const btn = e.target;
            const action = btn.getAttribute('data-action');
            const targetType = btn.getAttribute('data-target_type');
            let targetId = -1;
            switch (targetType) {
                case "post":
                    targetId = parseInt(btn.closest('[data-postid]')
                        .getAttribute('data-postid'), 10);
                    break;
                case "comment":
                    targetId = parseInt(btn.closest('[data-commentid]')
                        .getAttribute('data-commentid'), 10);
                    break;
                case "reply":
                    targetId = parseInt(btn.closest('[data-replyid]')
                        .getAttribute('data-replyid'), 10);
                    break;
                case "chapter":
                    targetId = parseInt(btn.closest('[data-chapterid]')
                        .getAttribute('data-chapterid'), 10);
                    break;
                default:
                    return;
            }
            if (targetId !== -1) {
                let vote = false;
                if (action === "like") { vote = true; }
                const data = { TargetId: targetId, Body: vote, TargetType: targetType };
                VoteRequest(btn, data);
            }
        }
    });


});


async function VoteRequest(btn, data) {
    var targetId = data.TargetId;
    var action = data.Body ? "like" : "dislike";

    await fetch("/HomeAction/Vote", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(function (response) {
            if (response.ok) {
                voting_visual(btn, action);
            }
            else {
                console.log("Server error -> " + response.status);
            }
        })
        .catch(error => console.log('Vote function failed.', error));
}


function voting_visual(btn, action) {
    let btnSibling = action === "like"
        ? btn.parentElement.querySelector('.dislikebtn')
        : btn.parentElement.querySelector('.likebtn');
        
    //Increase/Decrease vote count
    const showVoteCount = btn.parentElement.querySelector('.vote_count');
    let bvInputVal = showVoteCount.innerText !== "--" 
        ? parseInt(showVoteCount.innerText, 10) 
        : "--";
    if(bvInputVal !== "--"){
        if(action === "like"){
            if(btn.classList.contains('active')){
                bvInputVal = bvInputVal - 1;
            } else{
                if(btnSibling.classList.contains('active')){
                    bvInputVal = bvInputVal + 2;
                } else {
                    bvInputVal = bvInputVal + 1;
                }
            }
        } else if(action === "dislike") {
            if(btn.classList.contains('active')){
                bvInputVal = bvInputVal + 1;
            } else {
                if(btnSibling.classList.contains('active')){
                    bvInputVal = bvInputVal - 2;
                } else {
                    bvInputVal = bvInputVal - 1;
                }
            }
        }
        showVoteCount.innerText = bvInputVal;
    }


    //Vote
    if (btn.classList.contains("active")) {
        btn.classList.remove("active");
        if (action === "like") {
            btn.classList.remove("bi-hand-thumbs-up-fill");
            btn.classList.add("bi-hand-thumbs-up");
        }
        else {
            btn.classList.remove("bi-hand-thumbs-down-fill");
            btn.classList.add("bi-hand-thumbs-down");
        }
    }
    //Take the vote back
    else {
        btn.classList.add("active");
        if (action === "like") {
            btn.classList.remove("bi-hand-thumbs-up");
            btn.classList.add("bi-hand-thumbs-up-fill");
        }
        else {
            btn.classList.remove("bi-hand-thumbs-down");
            btn.classList.add("bi-hand-thumbs-down-fill");
        }
    }
    //Voting again - Opposite vote
    if (btnSibling.classList.contains("active")) {
        //removes the active status of old one
        //doesn't add something to the current action btn
        btnSibling.classList.remove("active");
        if (btnSibling.classList.contains("dislikebtn")) {
            btnSibling.classList.remove("bi-hand-thumbs-down-fill");
            btnSibling.classList.add("bi-hand-thumbs-down");
        }
        else {
            btnSibling.classList.remove("bi-hand-thumbs-up-fill");
            btnSibling.classList.add("bi-hand-thumbs-up");
        }
    }
}

//google auth
function googleHandleCredentialResponse(response) {
    $.ajax({
        type: "POST",
        url: "https://localhost:7067/Auth/GoogleSignin",
        data: { googleToken: response.credential },
        timeout: 0,
        success: function () {
            window.location.replace("https://localhost:7067");
        },
        error: function () {
            alert("Login with google failed");
        }
    });
    /*const responsePayload = decodeJwtResponse(response.credential);
    console.log("ID: " + responsePayload.sub);
    console.log('Full Name: ' + responsePayload.name);
    console.log("Email: " + responsePayload.email);*/
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//close modals, dropdowns, drawer etc
modalbg1_click = function () {
    const modalbg1 = document.querySelector('.modalbg1');
    const drawer = document.getElementById('drawer');
    const loginModal = document.getElementById('login-modal');

    if (drawer !== null && drawer.classList.contains('drawer-active')) {
        drawer.classList.remove('drawer-active');
        modalbg1.classList.remove('d-block');
    }
    if (loginModal !== null && loginModal.classList.contains('d-flex')) {
        loginModal.classList.remove('d-flex');
        modalbg1.classList.remove('d-block');
    }
}