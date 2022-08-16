﻿// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

$(document).ready(function(){

    //login modal - fetch api
    const login_form = document.getElementById('login-modal');
    login_form.addEventListener('submit', async function(event){
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
                setTimeout(function() {
                    location.reload();
                }, 500);
            }
            else if(response.status === 404){
                message.innerHTML = "*User not found*";
            }
            else{
                message.innerHTML = "*Server error*";
            }
        })
        .catch(error => console.log('Login function failed.', error));
    });


    //Vote - fetch api
    var voteBtns = document.getElementsByClassName('post-vote');
    Array.from(voteBtns).forEach(btn => {
        btn.addEventListener('click', async function(event){
            var action = btn.getAttribute('data-action');
            var voteTarget = "post";
            var targetElement = btn.closest('.post').id;
            if(targetElement !== null){
                VoteRequest(btn, voteTarget, action, targetElement);
            }
        });
    });
});
async function VoteRequest(btn, voteTarget, action, targetElement){
    var targetId = targetElement.replace("post-", "");

    var vote;
    if(action === "like"){ vote = true; }
    else{ vote = false; }

    var data = {};
    if(voteTarget == "post"){
        data = { TargetPostId: targetId, Vote1: vote };
    }
    else if(voteTarget == "chapter"){
        data = { TargetChapterId: targetId, Vote1: vote };
    }
    else if(voteTarget == "comment"){
        data = { TargetCommentId: targetId, Vote1: vote };
    }
    else if(voteTarget == "like"){
        data = { TargetReplyId: targetId, Vote1: vote };
    }
    
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
            var p_likesElement = document.querySelectorAll('#' + targetElement + ' .p-likes')[0];
            var p_likes = document.getElementById("postvote-" + targetId).value;
            if(p_likes !== "--"){
                var votecount = parseInt(p_likes);
                if(action === "like"){
                    p_likesElement.innerText = votecount + 1;
                }
                else{
                    p_likesElement.innerText = votecount - 1;
                }
            }
            var btnsibling = document.querySelectorAll('#' + targetElement + ' .p-likebtn')[0];
            if(action === "like"){
                btnsibling = document.querySelectorAll('#' + targetElement + ' .p-dislikebtn')[0];
            }
            if(btnsibling.classList.contains("active")){
                btnsibling.classList.remove("active");
                if(btnsibling.classList.contains("p-dislikebtn")){
                    btnsibling.classList.remove("bi-hand-thumbs-down-fill");
                    btnsibling.classList.add("bi-hand-thumbs-down");
                }
                else{
                    btnsibling.classList.remove("bi-hand-thumbs-up-fill");
                    btnsibling.classList.add("bi-hand-thumbs-up");
                }
            }
            if(btn.classList.contains("active")){
                p_likesElement.innerText = votecount;
                btn.classList.remove("active");
                if(action === "like"){
                    btn.classList.remove("bi-hand-thumbs-up-fill");
                    btn.classList.add("bi-hand-thumbs-up");
                }
                else{
                    btn.classList.remove("bi-hand-thumbs-down-fill");
                    btn.classList.add("bi-hand-thumbs-down");
                }
            }
            else{
                btn.classList.add("active");
                if(action === "like"){
                    btn.classList.remove("bi-hand-thumbs-up");
                    btn.classList.add("bi-hand-thumbs-up-fill");
                }
                else{
                    btn.classList.remove("bi-hand-thumbs-down");
                    btn.classList.add("bi-hand-thumbs-down-fill");
                }
            }
        }
        else if(response.status === 480){
            console.log("It's already voted.");
        }
        else{
            console.log("Server error");
        }
    })
    .catch(error => console.log('Vote function failed.', error));
}



//google auth
function googleHandleCredentialResponse(response) {
    $.ajax({
        type : "POST",
        url: "https://localhost:7067/Auth/GoogleSignin",
        data: {googleToken: response.credential},
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
 /*
 function decodeJwtResponse(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
};*/
//--------------






$('.click-outside').click(function(){
    closeModalsDrowpdownsEtc();
    /* Maybe I use it
    if($('.account-dropdown').hasClass('d-block')){
        $('.account-dropdown').removeClass('opacity-100');
        setTimeout(function(){
            $('.account-dropdown').removeClass('d-block');
        }, 100);
    }*/
});

//Top-right account dropdown menu
$('.ppic-wrap, .dropdown_icon-wrap').click(function(){
    if($('.account-dropdown').hasClass('d-block')){
        $('.account-dropdown').removeClass('opacity-100');
        setTimeout(function(){
            $('.account-dropdown').removeClass('d-block');
        }, 100);
    }
    else{
        $('.account-dropdown').addClass('d-block');
        setTimeout(function(){
            $('.account-dropdown').addClass('opacity-100');
        }, 100);
    }
});

//Drawer for mobile
$('.drawerbtn-cont > i, .dw-close > i').click(function(){
    if($('.drawer').hasClass('drawer-active')){
        $('.drawer').removeClass('drawer-active');
        $('.click-outside').removeClass('d-block');
    }
    else{
        $('.drawer').addClass('drawer-active');
        $('.click-outside').addClass('d-block');
    }
});

//Open/close login modal
$('.login-openbtn, .lm-closebtn').click(function(){
    if($('#login-modal').hasClass('d-flex')){
        $('#login-modal').removeClass('d-flex');
        $('#login-modal').removeClass('opacity-100');
        $('.click-outside').removeClass('d-block');
    }
    else{
        $('#login-modal').addClass('d-flex');
        $('.click-outside').addClass('d-block');
        setTimeout(function(){
            $('#login-modal').addClass('opacity-100');
        }, 100);
    }
    //Close others after opening login modal
    if($('.account-dropdown').hasClass('d-block')){
        $('.account-dropdown').removeClass('opacity-100');
        setTimeout(function(){
            $('.account-dropdown').removeClass('d-block');
        }, 100);
    }
    if($('.drawer').hasClass('drawer-active')){
        $('.drawer').removeClass('drawer-active');
    }
});


$('body').click(function(event) {
    var target = $(event.target);

    //Close dropdown of account container in header if clicked somewhere else
    if($('.account-dropdown').hasClass('d-block') && !target.parents('.account-cont').length){
        $('.account-dropdown').removeClass('opacity-100');
        setTimeout(function(){
            $('.account-dropdown').removeClass('d-block');
        }, 100);
    }
    /*
    if($('.drawer').hasClass('drawer-active') && !target.parents('.drawer').length){
        $('.drawer').removeClass('drawer-active');
        $('.click-outside').removeClass('d-block');
    }*/
});

//Post menu actions
$('.p-menubtn, .pd-closebtn').click(function(){
    var postwrap = $(this).parent().closest('.post');
    var postdetail = $(postwrap).find('.post-detail');
    var postmenu = $(postwrap).find('.post-menu');
    if($(postdetail).hasClass('d-flex')){
        $(postdetail).removeClass('d-flex');
        $(postdetail).addClass('d-none');
        $(postmenu).removeClass('d-none');
        $(postmenu).addClass('d-flex');
    }
    else{
        $(postdetail).removeClass('d-none');
        $(postdetail).addClass('d-flex');
        $(postmenu).removeClass('d-flex');
        $(postmenu).addClass('d-none');
    }
});

//close modals, dropdowns, drawer etc
function closeModalsDrowpdownsEtc(){
    if($('.drawer').hasClass('drawer-active')){
        $('.drawer').removeClass('drawer-active');
        $('.click-outside').removeClass('d-block');
    }
    if($('#orderby-modal').hasClass('d-flex')){
        $('#orderby-modal').removeClass('d-flex');
        $('#orderby-modal').removeClass('opacity-100');
        $('.click-outside').removeClass('d-block');
    }
    if($('#type-modal').hasClass('d-flex')){
        $('#type-modal').removeClass('d-flex');
        $('#type-modal').removeClass('opacity-100');
        $('.click-outside').removeClass('d-block');
    }
    if($('#filter-modal').hasClass('d-flex')){
        $('#filter-modal').removeClass('d-flex');
        $('#filter-modal').removeClass('opacity-100');
        $('.click-outside').removeClass('d-block');
    }
    if($('#login-modal').hasClass('d-flex')){
        $('#login-modal').removeClass('d-flex');
        $('.click-outside').removeClass('d-block');
    }
}