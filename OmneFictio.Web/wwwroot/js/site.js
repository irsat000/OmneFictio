"use strict";
class JustBody {
    body;
}
class Tag {
    id;
    body;
    userGenerated;
}
class ExistingStories {
    body;
    storyType;
}
class Language {
    lanCode;
    body;
}
class PostGift {
    sentDate;
    item;
}
class Authority {
    code;
    body;
}
class ofAccount_P {
    id;
    username;
    displayName;
    profilePic;
    selfDesc;
    deletedStatus;
    authorities;
}
class ofChapter {
    id;
    title;
    chapterIndex;
    isPublished;
}
class ofPost_1 {
    id;
    title;
    postDescription;
    publishDate;
    updateDate;
    coverImage;
    account;
    deletedStatus;
    language;
    postStatus;
    postType;
    ratedAs;
    chapters;
    postGifts;
    tags;
    existingStories;
    voteResult;
    rateResult;
    comRepLength;
    wordsLength;
    votedByUser;
    ratedByUser;
}
class ofComment_1 {
    id;
    body;
    publishDate;
    updateDate;
    account;
    targetPostId;
    repliesLength;
    voteResult;
    votedByUser;
    highlightedReply;
}
class ofReply_1 {
    id;
    body;
    publishDate;
    updateDate;
    account;
    voteResult;
    votedByUser;
}
class ofRead_GetPosts {
    posts;
    pages;
}
document.addEventListener("DOMContentLoaded", function () {
    const dombody = document.getElementsByTagName("BODY")[0];
    const modalbg1 = document.querySelector('.modalbg1');
    const drawer = document.getElementById('drawer');
    const loginModal = document.getElementById('login-modal');
    const acDropdown = document.querySelector('.account-dropdown');
    const switchThemeModal = document.querySelector('.theme-switcher');
    const themeNameMap = new Map([
        ['darkmode', 'Dark mode'],
        ['lightmode', 'Light mode'],
        ['customtheme1', 'Custom theme 1'],
        ['customtheme2', 'Custom theme 2']
    ]);
    const getThemeFromStorage = localStorage.getItem("currentTheme");
    if (getThemeFromStorage != null) {
        changeTheme(getThemeFromStorage);
    }
    document.addEventListener("click", function (e) {
        if (acDropdown.classList.contains('dflex') &&
            e.target.closest('.account-cont') == null) {
            acDropdown.classList.remove('opacity1');
            setTimeout(function () {
                acDropdown.classList.remove('dflex');
            }, 100);
        }
    });
    [...document.querySelectorAll('.logoutBtn')].forEach(btn => {
        btn.addEventListener('click', () => {
            fetch('/Auth/LogOut', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => res.json())
                .then((data) => {
                if (data.statusCode === 200) {
                    location.reload();
                }
            })
                .catch(error => console.log(error));
        });
    });
    modalbg1.addEventListener("click", function () {
        if (drawer.classList.contains('drawer-active')) {
            drawer.classList.remove('drawer-active');
            modalbg1.classList.remove('dblock');
        }
        if (loginModal.classList.contains('dflex')) {
            loginModal.classList.remove('dflex');
            loginModal.classList.remove('opacity1');
            modalbg1.classList.remove('dblock');
        }
        if (switchThemeModal.classList.contains('dflex')) {
            switchThemeModal.classList.remove('dflex');
            switchThemeModal.classList.remove('opacity1');
            modalbg1.classList.remove('dblock');
        }
        window.closeRepliesModal();
    });
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
    document.querySelectorAll('.drawerbtn-cont, .dw-close').forEach(btn => {
        btn.addEventListener('click', function () {
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
    document.querySelectorAll('.login-openbtn').forEach(btn => {
        btn.addEventListener('click', function () {
            if (loginModal.classList.contains('dflex') === false) {
                loginModal.classList.add('dflex');
                modalbg1.classList.add('dblock');
                setTimeout(function () {
                    loginModal.classList.add('opacity1');
                }, 100);
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
    document.querySelector('.lm-closebtn').addEventListener('click', function () {
        if (loginModal.classList.contains('dflex')) {
            loginModal.classList.remove('dflex');
            loginModal.classList.remove('opacity1');
            modalbg1.classList.remove('dblock');
        }
    });
    document.querySelector('.ad-theme-cont > span').addEventListener('click', () => {
        if (switchThemeModal.classList.contains('dflex') === false) {
            switchThemeModal.classList.add('dflex');
            modalbg1.classList.add('dblock');
            setTimeout(function () {
                switchThemeModal.classList.add('opacity1');
            }, 100);
            if (acDropdown.classList.contains('dflex')) {
                acDropdown.classList.remove('opacity1');
                setTimeout(function () {
                    acDropdown.classList.remove('dflex');
                }, 100);
            }
        }
    });
    document.querySelector('.ts-closebtn').addEventListener('click', function () {
        if (switchThemeModal.classList.contains('dflex')) {
            switchThemeModal.classList.remove('dflex');
            switchThemeModal.classList.remove('opacity1');
            modalbg1.classList.remove('dblock');
        }
    });
    switchThemeModal.querySelectorAll('ul > li').forEach(btn => {
        btn.addEventListener('click', () => {
            const selectedTheme = btn.getAttribute('data-themeval');
            switchThemeModal.classList.remove('dflex');
            switchThemeModal.classList.remove('opacity1');
            modalbg1.classList.remove('dblock');
            switchThemeModal.querySelectorAll('ul > li > i').forEach((btn) => btn.classList.remove('active'));
            window.localStorage.setItem("currentTheme", selectedTheme);
            changeTheme(selectedTheme);
        });
    });
    function changeTheme(selectedTheme) {
        dombody.classList.forEach(cname => {
            if (themeNameMap.has(cname)) {
                dombody.classList.remove(cname);
            }
        });
        dombody.classList.add(selectedTheme);
        switchThemeModal.querySelector('ul > li[data-themeval="' + selectedTheme + '"] > i')?.classList.add('active');
        const themeDisplayName = themeNameMap.get(selectedTheme);
        if (themeDisplayName !== undefined) {
            document.querySelector('.ad-theme-cont span').textContent = themeNameMap.get(selectedTheme);
        }
    }
    document.querySelector('.mr-close').addEventListener('click', function () {
        window.closeRepliesModal();
    });
    loginModal.addEventListener('submit', function (event) {
        event.preventDefault();
        const message = loginModal.querySelector('#loginmodal-message');
        const success = loginModal.querySelector('#loginmodal-success');
        message.innerHTML = "";
        fetch("/Auth/UserLogin", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: strfForm(loginModal)
        })
            .then((res) => res.json())
            .then((data) => {
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
    document.addEventListener('click', function (e) {
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
                const data = { targetId: targetId, body: vote, targetType: targetType };
                VoteRequest(btn, data);
            }
        }
    });
});
function AddComment(payload, commentSection) {
    fetch("/Action/AddComment", {
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
            commentSection.insertBefore(clone, commentSection.firstChild);
            document.getElementById('commentBody').value = "";
        }
    })
        .catch(error => { console.log('Fetch failed -> ' + error); });
}
function openRepliesModal(commentId) {
    const modalbg1 = document.querySelector('.modalbg1');
    const repliesModal = document.getElementById('modal-replies');
    if (document.getElementById('comment_instance') == null) {
        return;
    }
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
function fetchComments(type, parentid, section) {
    fetch("/g/GetComments/" + type + "/" + parentid, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then((res) => res.json())
        .then((data) => {
        section.innerHTML = "";
        if (data.statusCode === 200) {
            for (const comment of JSON.parse(data.value)) {
                section.appendChild(fillCommentTemplate(comment, null));
            }
            ;
        }
    })
        .catch(error => {
        section.innerHTML = "";
        console.log('Fetch failed -> ' + error);
    });
}
let frController;
function fetchReplies(commentId, section) {
    section.innerHTML = "";
    if (frController) {
        frController.abort();
        frController = null;
    }
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
        .then((data) => {
        if (data.statusCode === 200) {
            const response = JSON.parse(data.value);
            const comm = response.comment;
            const replies = response.replies;
            const commentInstance = document.getElementById('modalReplies-comment');
            const replyInstance = document.getElementById('modalReplies-reply');
            const commentClone = window.cloneFromTemplate(commentInstance);
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
            if (replies.length > 0) {
                for (const reply of replies) {
                    const replyClone = window.cloneFromTemplate(replyInstance);
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
function VoteRequest(btn, data) {
    var action = data.body ? "like" : "dislike";
    fetch("/Action/Vote", {
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
    const showVoteCount = btn.parentElement.querySelector('.vote_count');
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
    if (btnSibling.classList.contains("active")) {
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
function googleHandleCredentialResponse(response) {
    fetch("/Auth/GoogleSignin", {
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
        case "index-topposts":
            const index_todays = document.querySelector('.todaytop_body');
            const index_months = document.querySelector('.monthtop_body');
            for (let i = 0; i < 4; i++) {
                index_todays.appendChild(window.cloneFromTemplate(postSkelTemplate));
                index_months.appendChild(window.cloneFromTemplate(postSkelTemplate));
            }
            break;
        case "read-posts":
            const pl_column1 = document.getElementById('pl-column1');
            const pl_column2 = document.getElementById('pl-column2');
            for (let i = 0; i < 6; i++) {
                pl_column1.appendChild(window.cloneFromTemplate(postSkelTemplate));
                pl_column2.appendChild(window.cloneFromTemplate(postSkelTemplate));
            }
            break;
        case "post-commentsection":
        case "chapter-commentsection":
            const post_commentsection = document.getElementById("comment-section");
            for (let i = 0; i < 10; i++) {
                post_commentsection.appendChild(window.cloneFromTemplate(commentSkelTemplate));
            }
            break;
        case "profile-posts":
        case "profile-saved":
            const profilebody_forpost = document.getElementById(page);
            for (let i = 0; i < 10; i++) {
                profilebody_forpost.appendChild(window.cloneFromTemplate(postSkelTemplate));
            }
            break;
        case "profile-reviews":
            const profilebody_forreviews = document.getElementById(page);
            for (let i = 0; i < 10; i++) {
                profilebody_forreviews.appendChild(window.cloneFromTemplate(commentSkelTemplate));
            }
            break;
        default:
            break;
    }
}
function fillPostTemplate(post, defaultCoverVisibility = true) {
    const instance = document.getElementById('postList-post');
    const clone = window.cloneFromTemplate(instance);
    window.checkVoted_icons(clone, post.votedByUser);
    const container = clone.querySelector('.post');
    const title = clone.querySelector('.p-title > a');
    const publishDate = clone.querySelector('.p-date');
    const coverImg = clone.querySelector('.p-cover > img');
    const showCoverBtn = clone.querySelector('.p-cover > span');
    const body = clone.querySelector('.p-body > span');
    const voteCount = clone.querySelector('.vote_count');
    const rate = clone.querySelector('.p-rate');
    const username = clone.querySelector('.p-username');
    const userImg = clone.querySelector('.p-user > img');
    const type = clone.querySelector('.pi-type');
    const language = clone.querySelector('.pi-language');
    const status = clone.querySelector('.pi-status');
    const readerRating = clone.querySelector('.pi-rating');
    const tagSection = clone.querySelector('.pi-tags');
    const seriesSection = clone.querySelector('.pi-series');
    const chapterAmount = clone.querySelector('.pi-amount_of_chapters');
    const wordAmount = clone.querySelector('.pi-amount_of_words');
    const commentAmount = clone.querySelector('.pi-amount_of_comments');
    const updateDate = clone.querySelector('.pi-last_update');
    container.setAttribute('data-postid', post.id.toString());
    title.href = '/p/' + post.id + '?lp=' + window.location.href;
    ;
    title.textContent = post.title;
    publishDate.textContent = window.TimeAgo(post.publishDate);
    body.textContent = post.postDescription;
    if (post.coverImage !== null) {
        coverImg.src = '/images/covers/' + post.coverImage;
    }
    else {
        coverImg.parentElement.remove();
    }
    if (defaultCoverVisibility === false) {
        showCoverBtn.classList.add('active');
        showCoverBtn.addEventListener('click', () => showCoverBtn.classList.remove('active'));
    }
    if (post.voteResult >= 0) {
        voteCount.textContent = post.voteResult.toString();
    }
    rate.textContent = post.rateResult !== null
        ? Number((post.rateResult).toFixed(1)) + "/5"
        : "-/5";
    type.textContent = post.postType.body;
    language.textContent = post.language.body;
    status.textContent = post.postStatus.body;
    readerRating.textContent = post.ratedAs.body;
    if (post.chapters !== null) {
        chapterAmount.textContent = post.chapters.length.toString();
    }
    else {
        chapterAmount.textContent = "0";
    }
    wordAmount.textContent = post.wordsLength.toString();
    commentAmount.textContent = post.comRepLength.toString();
    updateDate.textContent = window.TimeAgo(post.updateDate, "short");
    if (post.tags !== null && post.tags.length > 0) {
        post.tags.forEach((tagname) => tagSection.innerHTML += "<span>" + tagname.body + "</span>");
    }
    else {
        tagSection.innerHTML = "<span>Empty</span>";
    }
    if (post.existingStories !== null && post.existingStories.length > 0) {
        post.existingStories.forEach((storyname) => seriesSection.innerHTML += "<span>" + storyname.body + "</span>");
    }
    else {
        seriesSection.remove();
    }
    if (post.account !== null) {
        username.textContent = post.account.displayName !== null
            ? post.account.displayName
            : post.account.username;
        if (post.account.profilePic !== null) {
            userImg.src = '/images/users/' + post.account.profilePic;
        }
        else {
            userImg.remove();
        }
    }
    else {
        username.textContent = "[Deleted]";
        userImg.remove();
    }
    return clone;
}
function fillCommentTemplate(comment, page) {
    const instance = document.getElementById('comment_instance');
    const clone = window.cloneFromTemplate(instance);
    window.checkVoted_icons(clone, comment.votedByUser);
    const cContainer = clone.querySelector('.comment');
    const cUserImg = clone.querySelector('.c-header > img');
    const cUsername = clone.querySelector('.c-username');
    const cPublishDate = clone.querySelector('.c-date');
    const cBody = clone.querySelector('.c-text > span');
    const cEvaluation = clone.querySelector('.c-evaluation');
    const cVoteCount = clone.querySelector('.c-likes');
    const cGetRepliesBtn = clone.querySelector('.get_replies');
    const cReplyBtn = clone.querySelector('.c-replybtn');
    const rContainer = clone.querySelector('.reply');
    const rBody = clone.querySelector('.r-text > span');
    const rVoteCount = clone.querySelector('.r-likes');
    const rUserImg = clone.querySelector('.r-user > img');
    const rUsername = clone.querySelector('.r-username');
    cContainer.setAttribute('data-commentid', comment.id.toString());
    cUserImg.src = '/images/users/' + comment.account.profilePic;
    cUsername.textContent = comment.account.displayName !== null
        ? comment.account.displayName
        : comment.account.username;
    cPublishDate.textContent = window.TimeAgo(comment.publishDate);
    cBody.textContent = comment.body;
    if (comment.voteResult >= 0) {
        cVoteCount.textContent = comment.voteResult.toString();
    }
    if (comment.repliesLength === 0) {
        cGetRepliesBtn.remove();
    }
    else {
        let repliesLengthText = " replies";
        if (comment.repliesLength === 1) {
            repliesLengthText = " reply";
        }
        cGetRepliesBtn.firstChild.textContent = comment.repliesLength + repliesLengthText;
        cGetRepliesBtn.addEventListener('click', () => window.openRepliesModal(comment.id.toString()));
    }
    const hreply = comment.highlightedReply;
    if (hreply) {
        window.checkVoted_icons(rContainer, hreply.votedByUser);
        rContainer.setAttribute('data-replyid', hreply.id.toString());
        rBody.textContent = hreply.body;
        if (hreply.voteResult >= 0) {
            rVoteCount.textContent = hreply.voteResult.toString();
        }
        rUserImg.src = '/images/users/' + hreply.account.profilePic;
        rUsername.textContent = hreply.account.displayName != null
            ? hreply.account.displayName
            : hreply.account.username;
    }
    else {
        clone.querySelector('.reply').remove();
    }
    if (page === "profile") {
        cReplyBtn.remove();
        let linkToPost = document.createElement('a');
        linkToPost.href = "/p/" + comment.targetPostId + "?cid=" + comment.id;
        linkToPost.textContent = "Post";
        cEvaluation.appendChild(linkToPost);
    }
    return clone;
}
function strfForm(form) {
    const formData = new FormData(form);
    const object = Object.fromEntries(formData.entries());
    return JSON.stringify(object);
}
function strfForm2(formData) {
    const object = Object.fromEntries(formData);
    return JSON.stringify(object);
}
function strfForm3(form) {
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
