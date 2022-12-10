"use strict";
// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.
// Write your JavaScript code.
document.addEventListener("DOMContentLoaded", function () {
    const dombody = document.getElementsByTagName("BODY")[0];
    const modalbg1 = document.querySelector('.modalbg1');
    const drawer = document.getElementById('drawer');
    const loginModal = document.getElementById('login-modal');
    const acDropdown = document.querySelector('.account-dropdown');
    const repliesModal = document.getElementById('modal-replies');
    modalbg1.addEventListener("click", function () {
        modalbg1_click();
    });
    //close modals, dropdowns, drawer etc when user click on the dark background
    const modalbg1_click = function () {
        if (drawer !== null && drawer.classList.contains('drawer-active')) {
            drawer.classList.remove('drawer-active');
            modalbg1.classList.remove('dblock');
        }
        if (loginModal !== null && loginModal.classList.contains('dflex')) {
            loginModal.classList.remove('dflex');
            modalbg1.classList.remove('dblock');
        }
        window.closeRepliesModal();
    };
    //Theme switch
    document.getElementById("theme-check")?.addEventListener("change", (e) => {
        const body = document.getElementsByTagName("body")[0];
        body.className = "";
        if (e.currentTarget.checked) {
            body.classList.add("lightmode");
        }
        else {
            body.classList.add("darkmode");
        }
    });
    //Top-right account dropdown menu
    document.querySelector('.account_btn-cont')?.addEventListener("click", function () {
        if (acDropdown.classList.contains('dflex')) {
            acDropdown.classList.remove('opacity1');
            setTimeout(function () {
                acDropdown.classList.remove('dflex');
            }, 100);
        }
        else {
            acDropdown.classList.add('dflex');
            setTimeout(function () {
                acDropdown.classList.add('opacity1');
            }, 100);
        }
    });
    //Drawer for mobile
    [document.querySelector('.drawerbtn-cont > i'),
        document.querySelector('.dw-close > i')].forEach(btn => {
        btn?.addEventListener('click', function () {
            if (drawer.classList.contains('drawer-active')) {
                drawer.classList.remove('drawer-active');
                modalbg1.classList.remove('dblock');
            }
            else {
                drawer.classList.add('drawer-active');
                modalbg1.classList.add('dblock');
            }
        });
    });
    //Open login modal
    document.querySelectorAll('.login-openbtn').forEach(btn => {
        btn.addEventListener('click', function () {
            if (loginModal.classList.contains('dflex') === false) {
                loginModal.classList.add('dflex');
                modalbg1.classList.add('dblock');
                setTimeout(function () {
                    loginModal.classList.add('opacity1');
                }, 100);
                //Close others after opening login modal
                if (acDropdown.classList.contains('dflex')) {
                    acDropdown.classList.remove('opacity1');
                    setTimeout(function () {
                        acDropdown.classList.remove('dflex');
                    }, 100);
                }
                if (drawer.classList.contains('drawer-active')) {
                    drawer.classList.remove('drawer-active');
                }
            }
        });
    });
    //Close login modal
    document.querySelector('.lm-closebtn')?.addEventListener('click', function () {
        if (loginModal.classList.contains('dflex')) {
            loginModal.classList.remove('dflex');
            loginModal.classList.remove('opacity1');
            modalbg1.classList.remove('dblock');
        }
    });
    dombody.addEventListener("click", function (e) {
        //Close dropdown of account container in header if clicked somewhere else
        if (acDropdown.classList.contains('dflex') &&
            e.target.closest('.account-cont') == null) {
            acDropdown.classList.remove('opacity1');
            setTimeout(function () {
                acDropdown.classList.remove('dflex');
            }, 100);
        }
    });
    //Open replies modal
    document.querySelector('.get_replies')?.addEventListener('click', function (e) {
        window.openRepliesModal(e.currentTarget);
    });
    //Open close modal
    document.querySelector('.mr-close')?.addEventListener('click', function () {
        window.closeRepliesModal();
    });
    //login modal - fetch api
    loginModal.addEventListener('submit', async function (event) {
        //disables redirection of form element
        event.preventDefault();
        //Get message elements
        const message = loginModal.querySelector('#loginmodal-message');
        const success = loginModal.querySelector('#loginmodal-success');
        message.innerHTML = "";
        //Request
        await fetch("/Auth/UserLogin", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: strfForm(loginModal)
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
    dombody.addEventListener('click', function (e) {
        if (e.target.classList.contains('likebtn') ||
            e.target.classList.contains('dislikebtn')) {
            const btn = e.target;
            const action = btn.getAttribute('data-action');
            const targetType = btn.getAttribute('data-target_type');
            let targetIdValue;
            switch (targetType) {
                case "post":
                    targetIdValue = btn.closest('[data-postid]')
                        .getAttribute('data-postid');
                    break;
                case "comment":
                    targetIdValue = btn.closest('[data-commentid]')
                        .getAttribute('data-commentid');
                    break;
                case "reply":
                    targetIdValue = btn.closest('[data-replyid]')
                        .getAttribute('data-replyid');
                    break;
                case "chapter":
                    targetIdValue = btn.closest('[data-chid]')
                        .getAttribute('data-chid');
                    break;
                default:
                    return;
            }
            if (targetIdValue !== null) {
                const targetId = parseInt(targetIdValue, 10);
                let vote = false;
                if (action === "like") {
                    vote = true;
                }
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
            const clone = window.cloneFromTemplate(instance);
            clone.querySelector('.comment').setAttribute('data-commentid', comment.id);
            clone.querySelector('.c-header > img').setAttribute('src', '/images/users/' + comment.account.profilePic);
            if (comment.account.displayName != null) {
                clone.querySelector('.c-username').textContent = comment.account.displayName;
            }
            else {
                clone.querySelector('.c-username').textContent = comment.account.username;
            }
            clone.querySelector('.c-date').textContent = window.TimeAgo(comment.publishDate);
            clone.querySelector('.c-text > span').textContent = comment.body;
            if (comment.voteResult >= 0) {
                clone.querySelector('.c-likes').textContent = comment.voteResult;
            }
            if (comment.repliesLength === 0) {
                clone.querySelector('.get_replies').remove();
            }
            else {
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
    const commentId = element.closest('.comment')
        .getAttribute('data-commentid');
    if (!repliesModal.classList.contains('dflex')) {
        repliesModal.classList.add('dflex');
        modalbg1.classList.add('dblock');
        const replySection = repliesModal.querySelector('.mr-body');
        fetchReplies(commentId, replySection);
    }
}
function closeRepliesModal() {
    const modalbg1 = document.querySelector('.modalbg1');
    const repliesModal = document.getElementById('modal-replies');
    if (repliesModal.classList.contains('dflex')) {
        repliesModal.classList.remove('dflex');
        modalbg1.classList.remove('dblock');
        if (frController) {
            frController.abort();
        }
        repliesModal.querySelector('.mr-body').innerHTML = "";
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
            for (const comment of JSON.parse(data.value)) {
                section.appendChild(await fillCommentTemplate(comment, null));
            }
            ;
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
    });
}
let frController;
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
            const commentClone = window.cloneFromTemplate(commentInstance);
            //Check if user voted this parent
            window.checkVoted_icons(commentClone, comm.votedByUser);
            commentClone.querySelector('.mr-comment').setAttribute('data-commentid', comm.id);
            commentClone.querySelector('.mrc-header > img').setAttribute('src', '/images/users/' + comm.account.profilePic);
            if (comm.account.displayName != null) {
                commentClone.querySelector('.mrc-username').textContent = comm.account.displayName;
            }
            else {
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
                for (const reply of comm.replies) {
                    const replyClone = window.cloneFromTemplate(replyInstance);
                    //Check if user voted this parent
                    window.checkVoted_icons(replyClone, reply.votedByUser);
                    replyClone.querySelector('.mr-reply').setAttribute('data-replyid', reply.id);
                    replyClone.querySelector('.mrr-header > img').setAttribute('src', '/images/users/' + reply.account.profilePic);
                    if (reply.account.displayName != null) {
                        replyClone.querySelector('.mrr-username').textContent = reply.account.displayName;
                    }
                    else {
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
        console.log('Fetching reply method is at fault', error);
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
        }
        else {
            console.log("Vote error status -> " + data.statusCode);
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
    //bv = base vote
    let bvInputVal = showVoteCount.textContent !== "--"
        ? parseInt(showVoteCount.textContent, 10)
        : null;
    if (bvInputVal !== null) {
        if (action === "like") {
            if (btn.classList.contains('active')) {
                bvInputVal = bvInputVal - 1;
            }
            else {
                if (btnSibling.classList.contains('active')) {
                    bvInputVal = bvInputVal + 2;
                }
                else {
                    bvInputVal = bvInputVal + 1;
                }
            }
        }
        else if (action === "dislike") {
            if (btn.classList.contains('active')) {
                bvInputVal = bvInputVal + 1;
            }
            else {
                if (btnSibling.classList.contains('active')) {
                    bvInputVal = bvInputVal - 2;
                }
                else {
                    bvInputVal = bvInputVal - 1;
                }
            }
        }
        showVoteCount.textContent = bvInputVal.toString();
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
}
function createSkeletons(page) {
    const postSkelTemplate = document.getElementById("postSkeleton");
    const commentSkelTemplate = document.getElementById("commentSkeleton");
    switch (page) {
        case "read-posts":
            //Creates post skeletons for read page
            const pl_column1 = document.getElementById('pl-column1');
            const pl_column2 = document.getElementById('pl-column2');
            for (let i = 0; i < 6; i++) {
                pl_column1.appendChild(window.cloneFromTemplate(postSkelTemplate));
                pl_column2.appendChild(window.cloneFromTemplate(postSkelTemplate));
            }
            break;
        case "post-commentsection":
        case "chapter-commentsection":
            //Creates comment skeletons for post or chapter's comment section
            const post_commentsection = document.getElementById("comment-section");
            for (let i = 0; i < 10; i++) {
                const clone = window.cloneFromTemplate(commentSkelTemplate);
                post_commentsection.appendChild(clone);
            }
            break;
        case "profile-posts":
        case "profile-saved":
            //Creates post skeletons for the user posts or saved posts in profile
            const profilebody_forpost = document.getElementById(page);
            for (let i = 0; i < 10; i++) {
                const clone = window.cloneFromTemplate(postSkelTemplate);
                profilebody_forpost.appendChild(clone);
            }
            break;
        case "profile-reviews":
            //Creates review(comment to posts) skeletons in profile
            const profilebody_forreviews = document.getElementById(page);
            for (let i = 0; i < 10; i++) {
                const clone = window.cloneFromTemplate(commentSkelTemplate);
                profilebody_forreviews.appendChild(clone);
            }
            break;
        default:
            break;
    }
}
function fillPostTemplate(post) {
    const instance = document.getElementById('postList-post');
    const clone = window.cloneFromTemplate(instance);
    //Check if user voted this parent
    window.checkVoted_icons(clone, post.votedByUser);
    clone.querySelector('.post').setAttribute('data-postid', post.id);
    clone.querySelector('.p-title > a').setAttribute('href', '/p/' + post.id);
    clone.querySelector('.p-title > a').textContent = post.title;
    clone.querySelector('.p-date').textContent = window.TimeAgo(post.publishDate);
    if (post.coverImage !== null) {
        clone.querySelector('.p-cover > img').setAttribute('src', '/images/covers/' + post.coverImage);
    }
    clone.querySelector('.p-body > span').textContent = post.postDescription;
    if (post.voteResult >= 0) {
        clone.querySelector('.vote_count').textContent = post.voteResult;
    }
    clone.querySelector('.p-rate').textContent = post.rateResult >= 0 && post.rateResult <= 10
        ? Number((post.rateResult).toFixed(1)) + "/10"
        : "-/10";
    clone.querySelector('.pi-type').textContent = post.postType.body;
    clone.querySelector('.pi-language').textContent = post.language.body;
    clone.querySelector('.pi-status').textContent = post.postStatus.body;
    clone.querySelector('.pi-rating').textContent = post.ratedAs.body;
    clone.querySelector('.pi-amount_of_chapters').textContent = post.chapters.length;
    clone.querySelector('.pi-amount_of_words').textContent = post.wordsLength;
    clone.querySelector('.pi-amount_of_comments').textContent = post.comRepLength;
    clone.querySelector('.pi-last_update').textContent = window.TimeAgo(post.updateDate, "short");
    const tagSection = clone.querySelector('.pi-tags');
    const basedOnSection = clone.querySelector('.pi-series');
    //tag list
    if (post.tags.length > 0) {
        post.tags.forEach((tagname) => tagSection.innerHTML += "<span>" + tagname.body + "</span>");
    }
    else {
        tagSection.innerHTML = "<span>Empty</span>";
    }
    //based on list
    if (post.existingStories.length > 0) {
        post.existingStories.forEach((storyname) => basedOnSection.innerHTML += "<span>" + storyname.body + "</span>");
    }
    else {
        basedOnSection.remove();
    }
    //user
    if (post.account.displayName !== null) {
        clone.querySelector('.p-username').textContent = post.account.displayName;
    }
    else {
        clone.querySelector('.p-username').textContent = post.account.username;
    }
    clone.querySelector('.p-user > img').setAttribute('src', '/images/users/' + post.account.profilePic);
    return clone;
}
async function fillCommentTemplate(comment, page) {
    const instance = document.getElementById('comment_instance');
    const clone = window.cloneFromTemplate(instance);
    //Check if user voted this parent
    window.checkVoted_icons(clone, comment.votedByUser);
    clone.querySelector('.comment').setAttribute('data-commentid', comment.id);
    clone.querySelector('.c-header > img').setAttribute('src', '/images/users/' + comment.account.profilePic);
    if (comment.account.displayName != null) {
        clone.querySelector('.c-username').textContent = comment.account.displayName;
    }
    else {
        clone.querySelector('.c-username').textContent = comment.account.username;
    }
    clone.querySelector('.c-date').textContent = window.TimeAgo(comment.publishDate);
    clone.querySelector('.c-text > span').textContent = comment.body;
    if (comment.voteResult >= 0) {
        clone.querySelector('.c-likes').textContent = comment.voteResult;
    }
    if (comment.repliesLength === 0) {
        clone.querySelector('.get_replies').remove();
    }
    else {
        let repliesLengthText = " replies";
        if (comment.repliesLength === 1) {
            repliesLengthText = " reply";
        }
        clone.querySelector('.get_replies > span').textContent = comment.repliesLength + repliesLengthText;
    }
    const hreply = await fetchHighlightedReply(comment.id);
    if (hreply) {
        //Check if user voted this parent
        window.checkVoted_icons(clone.querySelector('.reply'), hreply.votedByUser);
        clone.querySelector('.reply').setAttribute('data-replyid', hreply.id);
        clone.querySelector('.r-text > span').textContent = hreply.body;
        if (hreply.voteResult >= 0) {
            clone.querySelector('.r-likes').textContent = hreply.voteResult;
        }
        clone.querySelector('.r-user > img').setAttribute('src', '/images/users/' + hreply.account.profilePic);
        if (hreply.account.displayName != null) {
            clone.querySelector('.r-username').textContent = hreply.account.displayName;
        }
        else {
            clone.querySelector('.r-username').textContent = hreply.account.username;
        }
    }
    else {
        clone.querySelector('.reply').remove();
    }
    if (page === "profile") {
        clone.querySelector('.c-replybtn').remove();
        let linkToPost = document.createElement('a');
        linkToPost.href = "/p/" + comment.targetPostId; //This is nullable but reviews are only post comments anyway
        linkToPost.textContent = "Post";
        clone.querySelector('.c-evaluation').appendChild(linkToPost);
    }
    return clone;
}
//UTILITY
function strfForm(form) {
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    console.log(JSON.stringify(object));
    return JSON.stringify(object);
}
function strfForm2(form) {
    const formData = new FormData(form);
    let object = {};
    formData.forEach(function (value, key) {
        object[key] = value;
    });
    return JSON.stringify(object);
}
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function TimeAgo(time, wordType = "long") {
    const periods = {
        month: 30 * 24 * 60 * 60 * 1000,
        week: 7 * 24 * 60 * 60 * 1000,
        day: 24 * 60 * 60 * 1000,
        hour: 60 * 60 * 1000,
        minute: 60 * 1000
    };
    const diff = Date.now() - new Date(time);
    let val;
    let attachment = "";
    if (diff > periods.month) {
        val = Math.floor(diff / periods.month);
        if (wordType === "long") {
            attachment = "month";
        }
        else {
            attachment = "mo";
        }
    }
    else if (diff > periods.week) {
        val = Math.floor(diff / periods.week);
        if (wordType === "long") {
            attachment = "week";
        }
        else {
            attachment = "w";
        }
    }
    else if (diff > periods.day) {
        val = Math.floor(diff / periods.day);
        if (wordType === "long") {
            attachment = "day";
        }
        else {
            attachment = "d";
        }
    }
    else if (diff > periods.hour) {
        val = Math.floor(diff / periods.hour);
        if (wordType === "long") {
            attachment = "h";
        }
        else {
            attachment = "h";
        }
    }
    else if (diff > periods.minute) {
        val = Math.floor(diff / periods.minute);
        if (wordType === "long") {
            attachment = "m";
        }
        else {
            attachment = "m";
        }
    }
    else {
        if (wordType === "long") {
            return "Just now";
        }
        else {
            return "Now";
        }
    }
    if (val > 1 && wordType === "long") {
        attachment += "s ago";
    }
    else if (val === 1 && wordType === "long") {
        attachment += " ago";
    }
    return val + " " + attachment;
}
function getPathPart(index) {
    const pathname = window.location.pathname;
    const slashindex = pathname.split('/', index).join('/').length;
    let getval = pathname.substring(pathname.indexOf('/') + slashindex + 1);
    if (getval.includes("/")) {
        getval = getval.substring(0, getval.indexOf('/'));
    }
    return getval;
}
function cloneFromTemplate(instance) {
    return instance.content.cloneNode(true);
}
/* OUTDATED. Check vote with request.
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
*/
