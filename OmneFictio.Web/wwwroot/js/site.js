﻿// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.



$(document).ready(function () {
    document.querySelector('.modalbg1').addEventListener("click", function () {
        modalbg1_click();
    });
    //close modals, dropdowns, drawer etc when user click on the dark background
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

        window.closeRepliesModal();
    }

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

    //Post detail-menu button
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains("p-menubtn") ||
            e.target.classList.contains("pd-closebtn")) {
            const post = e.target.closest('.post');
            const postDetail = post.querySelector('.post-body');
            const postMenu = post.querySelector('.post-menu');
            if (!postMenu.classList.contains('d-flex')) {
                postMenu.classList.add('d-flex');
                postDetail.classList.add('d-none');
            } else {
                postMenu.classList.remove('d-flex');
                postDetail.classList.remove('d-none');
            }
        }
    });


    //Open close replies modal
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('get_replies') ||
            (e.target.parentElement != null &&
                e.target.parentElement.classList.contains('get_replies'))) {
            window.openRepliesModal(e.target);
        }
        else if (e.target.classList.contains('mr-close') ||
            (e.target.parentElement != null &&
                e.target.parentElement.classList.contains('mr-close'))) {
            window.closeRepliesModal();
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
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.statusCode === 200) {
                    success.innerHTML = "SUCCESS";
                    setTimeout(function () {
                        location.reload();
                    }, 500);
                }
                else {
                    message.innerHTML = "*Failed*";
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
                    targetId = parseInt(btn.closest('[data-chid]')
                        .getAttribute('data-chid'), 10);
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

//--------COMMENT SECTION-------

async function AddComment(payload, commentSection) {
    //Adds a new comment
    await fetch("/Action/AddComment", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: payload
    })
        .then((res) => res.json())
        .then(async (data) => {
            if (data.statusCode === 200) {
                const comment = JSON.parse(data.value).returnComment;
                const instance = document.getElementById('comment_instance');
                const clone = instance.content.cloneNode(true);

                clone.querySelector('.comment').setAttribute('data-commentid', comment.id);
                if (comment.account.displayName != null) {
                    clone.querySelector('.c-username').textContent = comment.account.displayName;
                } else {
                    clone.querySelector('.c-username').textContent = comment.account.username;
                }
                clone.querySelector('.c-date').textContent = window.TimeAgo(comment.publishDate);
                clone.querySelector('.c-text > span').textContent = comment.body;
                if (comment.voteResult >= 0) {
                    clone.querySelector('.c-likes').textContent = comment.voteResult;
                }
                if (comment.repliesLength === 0) {
                    clone.querySelector('.get_replies').remove();
                } else {
                    let repliesLengthText = " replies";
                    if (comment.repliesLength === 1) {
                        repliesLengthText = " reply";
                    }
                    clone.querySelector('.get_replies > span').textContent = comment.repliesLength + repliesLengthText;
                }
                clone.querySelector('.reply').remove();
                //add comment to the comment section
                commentSection.insertBefore(clone, commentSection.firstChild);
                //clear commenting body
                document.getElementById('commentBody').value = "";
            }
        })
        .catch(error => { console.log('Fetch failed -> ' + error); });
}
function openRepliesModal(element) {
    const modalbg1 = document.querySelector('.modalbg1');
    const repliesModal = document.getElementById('modal-replies');
    if (document.getElementById('comment_instance') == null) {
        return;
    }
    var commentId = element.closest('.comment')
        .getAttribute('data-commentid');
    if (!repliesModal.classList.contains('d-flex')) {
        repliesModal.classList.add('d-flex');
        modalbg1.classList.add('d-block');
        const replySection = document.querySelector('#modal-replies > .mr-body');
        fetchReplies(commentId, replySection);
    }
}
function closeRepliesModal() {
    const modalbg1 = document.querySelector('.modalbg1');
    const repliesModal = document.getElementById('modal-replies');
    if (repliesModal.classList.contains('d-flex')) {
        repliesModal.classList.remove('d-flex');
        modalbg1.classList.remove('d-block');
        if (frController) {
            frController.abort();
        }
        document.querySelector('#modal-replies > .mr-body').innerHTML = "";
    }
}

async function fetchComments(type, parentid, section) {
    await fetch("/g/GetComments/" + type + "/" + parentid, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then((res) => res.json())
        .then(async (data) => {
            if (data.statusCode === 200) {
                //console.log(JSON.parse(data.value));
                if (document.getElementById('comment_instance') == null) {
                    return;
                }
                const instance = document.getElementById('comment_instance');
                for (const comment of JSON.parse(data.value)) {
                    const clone = instance.content.cloneNode(true);
                    const checkvotepayload = "TargetId=" + comment.id + "&TargetType=comment";
                    //Check if user voted this parent
                    //await window.checkVoted_IconStuff(clone, checkvotepayload);
                    checkVoted_icons(clone, comment.votedByUser);

                    clone.querySelector('.comment').setAttribute('data-commentid', comment.id);
                    if (comment.account.displayName != null) {
                        clone.querySelector('.c-username').textContent = comment.account.displayName;
                    } else {
                        clone.querySelector('.c-username').textContent = comment.account.username;
                    }
                    clone.querySelector('.c-date').textContent = window.TimeAgo(comment.publishDate);
                    clone.querySelector('.c-text > span').textContent = comment.body;
                    if (comment.voteResult >= 0) {
                        clone.querySelector('.c-likes').textContent = comment.voteResult;
                    }
                    if (comment.repliesLength === 0) {
                        clone.querySelector('.get_replies').remove();
                    } else {
                        let repliesLengthText = " replies";
                        if (comment.repliesLength === 1) {
                            repliesLengthText = " reply";
                        }
                        clone.querySelector('.get_replies > span').textContent = comment.repliesLength + repliesLengthText;
                    }
                    const hreply = await fetchHighlightedReply(comment.id);
                    if (hreply) {
                        //Check if user voted this parent
                        const checkvotepayload_reply = "TargetId=" + hreply.id + "&TargetType=reply";
                        //await window.checkVoted_IconStuff(clone.querySelector('.reply'), checkvotepayload_reply);
                        checkVoted_icons(clone.querySelector('.reply'), hreply.votedByUser);

                        clone.querySelector('.reply').setAttribute('data-replyid', hreply.id);
                        clone.querySelector('.r-text > span').textContent = hreply.body;
                        if (hreply.voteResult >= 0) {
                            clone.querySelector('.r-likes').textContent = hreply.voteResult;
                        }
                        if (hreply.account.displayName != null) {
                            clone.querySelector('.r-username').textContent = hreply.account.displayName;
                        } else {
                            clone.querySelector('.r-username').textContent = hreply.account.username;
                        }
                    }
                    else {
                        clone.querySelector('.reply').remove();
                    }
                    section.appendChild(clone);
                };
            }
        })
        .catch(error => {
            console.log('Fetch failed -> ' + error);
        });
}
function fetchHighlightedReply(commentId) {
    return new Promise((resolve, reject) => {
        fetch("/g/GetHighlightedReply/" + commentId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((data) => {
                resolve(data.statusCode === 200 ? JSON.parse(data.value) : null);
            })
            .catch(error => {
                console.log("Fetch failed -> " + error);
            });
    })
}

let frController = null;
async function fetchReplies(commentId, section) {
    section.innerHTML = "";
    //cancel pending request if there is one
    if (frController) {
        frController.abort();
        frController = null;
    }
    //new controller for new request
    frController = new AbortController();
    fetch("/g/GetComment/" + commentId, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        signal: frController.signal
    })
        .then((res) => res.json())
        .then(async (data) => {
            if (data.statusCode === 200) {
                const comm = JSON.parse(data.value);
                console.log(comm);
                const commentInstance = document.getElementById('modalReplies-comment');
                const replyInstance = document.getElementById('modalReplies-reply');
                const commentClone = commentInstance.content.cloneNode(true);
                //Check if user voted this parent
                const checkvotepayload = "TargetId=" + comm.id + "&TargetType=comment";
                //await window.checkVoted_IconStuff(commentClone, checkvotepayload);
                checkVoted_icons(commentClone, comm.votedByUser);

                commentClone.querySelector('.mr-comment').setAttribute('data-commentid', comm.id);
                if (comm.account.displayName != null) {
                    commentClone.querySelector('.mrc-username').textContent = comm.account.displayName;
                } else {
                    commentClone.querySelector('.mrc-username').textContent = comm.account.username;
                }
                commentClone.querySelector('.mrc-date').textContent = window.TimeAgo(comm.publishDate);
                commentClone.querySelector('.mrc-text > span').textContent = comm.body;
                if (comm.voteResult >= 0) {
                    commentClone.querySelector('.mrc-likes').textContent = comm.voteResult;
                }
                section.appendChild(commentClone);


                //if it has replies

                if (comm.replies.length > 0) {
                    /*commentClone.querySelector('.mr-comment').setAttribute('data-commentid', comm.id);
                    if (comm.account.displayName != null) {
                        commentClone.querySelector('.mrc-username').textContent = comm.account.displayName;
                    } else {
                        commentClone.querySelector('.mrc-username').textContent = comm.account.username;
                    }
                    commentClone.querySelector('.mrc-date').textContent = window.TimeAgo(comm.publishDate);
                    commentClone.querySelector('.mrc-text > span').textContent = comm.body;
                    if (comm.voteResult >= 0) {
                        commentClone.querySelector('.mrc-likes').textContent = comm.voteResult;
                    }
                    section.appendChild(commentClone);*/

                    for (const reply of comm.replies) {
                        const replyClone = replyInstance.content.cloneNode(true);
                        //Check if user voted this parent
                        const checkvotepayload_reply = "TargetId=" + reply.id + "&TargetType=reply";
                        //await window.checkVoted_IconStuff(replyClone, checkvotepayload_reply);
                        checkVoted_icons(replyClone, reply.votedByUser);

                        replyClone.querySelector('.mr-reply').setAttribute('data-replyid', reply.id);
                        if (reply.account.displayName != null) {
                            replyClone.querySelector('.mrr-username').textContent = reply.account.displayName;
                        } else {
                            replyClone.querySelector('.mrr-username').textContent = reply.account.username;
                        }
                        replyClone.querySelector('.mrr-date').textContent = window.TimeAgo(reply.publishDate);
                        replyClone.querySelector('.mrr-text > span').textContent = reply.body;
                        if (reply.voteResult >= 0) {
                            replyClone.querySelector('.mrr-likes').textContent = reply.voteResult;
                        }
                        section.appendChild(replyClone);
                    }
                }
            }
        })
        .catch(error => {
            console.log('Fetching reply method is at fault', error)
        });
}
//--------COMMENT SECTION ENDS-------




async function VoteRequest(btn, data) {
    var action = data.Body ? "like" : "dislike";

    await fetch("/Action/Vote", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.statusCode === 200) {
                voting_visual(btn, action);
            } else {
                console.log("Server error -> " + response.statusCode);
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
    if (bvInputVal !== "--") {
        if (action === "like") {
            if (btn.classList.contains('active')) {
                bvInputVal = bvInputVal - 1;
            } else {
                if (btnSibling.classList.contains('active')) {
                    bvInputVal = bvInputVal + 2;
                } else {
                    bvInputVal = bvInputVal + 1;
                }
            }
        } else if (action === "dislike") {
            if (btn.classList.contains('active')) {
                bvInputVal = bvInputVal + 1;
            } else {
                if (btnSibling.classList.contains('active')) {
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

async function checkVoted_IconStuff(clone, checkvotepayload) {
    await fetch("/g/CheckVoteByUser?" + checkvotepayload, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then((res) => res.json())
        .then((data) => {
            const likebtn = clone.querySelector('[data-action="like"]');
            const dislikebtn = clone.querySelector('[data-action="dislike"]');
            likebtn.className = "";
            dislikebtn.className = "";
            if (data.statusCode === 200) {
                switch (data.value) {
                    case "true":
                        likebtn.classList.add('likebtn', 'bi', 'bi-hand-thumbs-up-fill', 'active');
                        dislikebtn.classList.add('dislikebtn', 'bi', 'bi-hand-thumbs-down');
                        break;
                    case "false":
                        likebtn.classList.add('likebtn', 'bi', 'bi-hand-thumbs-up');
                        dislikebtn.classList.add('dislikebtn', 'bi', 'bi-hand-thumbs-down-fill', 'active');
                        break;
                }
            }
            else {
                likebtn.classList.add('likebtn', 'bi', 'bi-hand-thumbs-up');
                dislikebtn.classList.add('dislikebtn', 'bi', 'bi-hand-thumbs-down');
            }
        })
        .catch(error => {
            console.log('vote check failed -> ' + error);
        });
}

function checkVoted_icons(clone, val) {
    const likebtn = clone.querySelector('[data-action="like"]');
    const dislikebtn = clone.querySelector('[data-action="dislike"]');
    likebtn.className = "";
    dislikebtn.className = "";
    switch (val) {
        case true:
            likebtn.classList.add('likebtn', 'bi', 'bi-hand-thumbs-up-fill', 'active');
            dislikebtn.classList.add('dislikebtn', 'bi', 'bi-hand-thumbs-down');
            break;
        case false:
            likebtn.classList.add('likebtn', 'bi', 'bi-hand-thumbs-up');
            dislikebtn.classList.add('dislikebtn', 'bi', 'bi-hand-thumbs-down-fill', 'active');
            break;
        default:
            likebtn.classList.add('likebtn', 'bi', 'bi-hand-thumbs-up');
            dislikebtn.classList.add('dislikebtn', 'bi', 'bi-hand-thumbs-down');
            break;
    }
}

//google auth
async function googleHandleCredentialResponse(response) {
    await fetch("/Auth/GoogleSignin", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: response.credential })
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.statusCode === 200) {
                setTimeout(function () {
                    window.location.href = "https://localhost:7067/";
                }, 500);
            }
            else {
                alert("Login failed");
            }
        })
        .catch(error => console.log('External login failed.', error));
    /*const responsePayload = decodeJwtResponse(response.credential);
    console.log("ID: " + responsePayload.sub);
    console.log('Full Name: ' + responsePayload.name);
    console.log("Email: " + responsePayload.email);*/
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


function TimeAgo(time) {
    const periods = {
        month: 30 * 24 * 60 * 60 * 1000,
        week: 7 * 24 * 60 * 60 * 1000,
        day: 24 * 60 * 60 * 1000,
        hour: 60 * 60 * 1000,
        minute: 60 * 1000
    };
    const diff = Date.now() - new Date(time);
    let val;
    if (diff > periods.month) {
        // it was at least a month ago
        val = Math.floor(diff / periods.month);
        if (val > 1) {
            return val + " months ago";
        } else if (val === 1) {
            return val + " month ago";
        }
    }
    else if (diff > periods.week) {
        val = Math.floor(diff / periods.week);
        if (val > 1) {
            return val + " weeks ago";
        } else if (val === 1) {
            return val + " week ago";
        }
    }
    else if (diff > periods.day) {
        val = Math.floor(diff / periods.day);
        if (val > 1) {
            return val + " days ago";
        } else if (val === 1) {
            return val + " day ago";
        }
    }
    else if (diff > periods.hour) {
        val = Math.floor(diff / periods.hour);
        if (val > 1) {
            return val + " hours ago";
        } else if (val === 1) {
            return val + " hour ago";
        }
    }
    else if (diff > periods.minute) {
        val = Math.floor(diff / periods.minute);
        if (val > 1) {
            return val + " minutes ago";
        } else if (val === 1) {
            return val + " minute ago";
        }
    } else {
        return "Just now";
    }
}

function getSlashQuery(index) {
    const pathname = window.location.pathname;
    const slashindex = pathname.split('/', index).join('/').length;
    let getval = pathname.substring(pathname.indexOf('/') + slashindex + 1);
    if (getval.includes("/")) {
        getval = getval.substring(0, getval.indexOf('/'));
    }
    return getval;
}