"use strict";
document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const modalbg1 = document.querySelector('.modalbg1');
    const commentSection = document.getElementById('comment-section');
    const chaptersModal = document.getElementById('modal-chapters');
    const fullsizecover = document.getElementById('fullsize-cover');
    modalbg1.addEventListener("click", function () {
        closeChaptersModal();
    });
    document.addEventListener('click', function (e) {
        const target = e.target;
        if (target.classList.contains('p-basecover')) {
            fullsizecover.classList.add('dblock');
        }
        if (target.closest('c-menupopup') === null
            && !target.closest('.c-menu')
            && !target.classList.contains('c-menu')) {
            closeAllCommentMenus();
        }
    });
    if (params.get('lp') !== null) {
        params.delete('lp');
        let newUrl = window.location.href.split('?')[0];
        if ([...params.keys()].length > 0) {
            newUrl += "?" + params.toString();
        }
        window.history.replaceState({}, document.title, newUrl);
    }
    const postId = window.getPathPart(2);
    GetPost();
    async function GetPost() {
        if (isNaN(Number(postId))) {
            return;
        }
        await fetch("/g/GetPost/" + postId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then(async (data) => {
            if (data.statusCode === 200) {
                const post = JSON.parse(data.value);
                const instance = document.getElementById('getpost_instance');
                const clone = window.cloneFromTemplate(instance);
                window.checkVoted_icons(clone, post.votedByUser);
                clone.querySelector('.post-main').setAttribute('data-postid', post.id);
                if (post.coverImage !== null) {
                    clone.querySelector('.p-cover > img').setAttribute('src', '/images/covers/' + post.coverImage);
                    clone.querySelector('.p-cover-mobile > img').setAttribute('src', '/images/covers/' + post.coverImage);
                    document.getElementById('fsc-img').setAttribute('src', '/images/covers/' + post.coverImage);
                }
                else {
                    clone.querySelector('.p-cover').remove();
                    clone.querySelector('.p-cover-mobile').remove();
                }
                clone.querySelector('.p-title').textContent = post.title;
                clone.querySelector('.p-description').textContent = post.postDescription;
                if (post.voteResult >= 0) {
                    clone.querySelector('.vote_count').textContent = post.voteResult;
                }
                if (post.account.displayName !== null) {
                    clone.querySelector('.p-username').textContent = post.account.displayName;
                }
                else {
                    clone.querySelector('.p-username').textContent = post.account.username;
                }
                clone.querySelector('.p-uimg-cont > img').setAttribute('src', '/images/users/' + post.account.profilePic);
                clone.querySelector('.pp-type').textContent = post.postType.body;
                clone.querySelector('.pp-language').textContent = post.language.body;
                clone.querySelector('.pp-status').textContent = post.postStatus.body;
                clone.querySelector('.pp-rating').textContent = post.ratedAs.body;
                const postSaveBtn = clone.querySelector('.savepost');
                if (post.savedByUser == true) {
                    postSaveBtn.classList.remove('bi-bookmark');
                    postSaveBtn.classList.add('bi-bookmark-fill');
                    postSaveBtn.classList.add('active');
                }
                postSaveBtn.addEventListener('click', () => {
                    fetch('/Action/SavePost', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ targetPostId: post.id })
                    })
                        .then((res) => res.json())
                        .then((data) => {
                        if (data.statusCode === 200) {
                            postSaveBtn.classList.remove('bi-bookmark');
                            postSaveBtn.classList.add('bi-bookmark-fill');
                            postSaveBtn.classList.add('active');
                        }
                        else if (data.statusCode === 202) {
                            postSaveBtn.classList.remove('bi-bookmark-fill');
                            postSaveBtn.classList.remove('active');
                            postSaveBtn.classList.add('bi-bookmark');
                        }
                        else {
                            alert("Failed while saving post");
                        }
                    })
                        .catch(error => { console.log("Fetch failed -> " + error); });
                });
                if (post.rateResult != null) {
                    clone.querySelector('.postrate > span').textContent = post.rateResult + "/5";
                    let i = 0;
                    do {
                        clone.querySelectorAll('.postrate > i')[i].classList.remove('bi-star');
                        clone.querySelectorAll('.postrate > i')[i].classList.add('bi-star-fill');
                        i++;
                    } while (i < Math.round(post.rateResult));
                }
                const tagSection = clone.querySelector('.p-tags');
                const seriesSection = clone.querySelector('.p-series');
                if (post.tags.length > 0) {
                    post.tags.forEach((tagname) => tagSection.innerHTML += "<span>" + tagname.body + "</span>");
                }
                else {
                    tagSection.innerHTML = "<span>No tags</span>";
                }
                if (post.existingStories.length > 0) {
                    post.existingStories.forEach((storyname) => seriesSection.innerHTML += "<span>" + storyname.body + "</span>");
                }
                else {
                    seriesSection.remove();
                }
                clone.querySelector('.pi-amount_of_words').textContent = post.wordsLength;
                clone.querySelector('.pi-amount_of_comments').textContent = post.comRepLength;
                clone.querySelector('.pi-publish_date').textContent = window.TimeAgo(post.publishDate);
                if (post.publishDate !== post.updateDate) {
                    clone.querySelector('.pi-last_update').textContent = window.TimeAgo(post.updateDate);
                }
                else {
                    clone.querySelector('.pi-last_update').closest('.pi-detail-column').remove();
                }
                const rateIconBtns = [...clone.querySelectorAll('.rate_the_post i')].reverse();
                rateIconBtns.forEach(i => {
                    i.addEventListener('click', async () => {
                        const rateVal = Number(i.getAttribute('data-rateval'));
                        await RateThePost(rateVal, rateIconBtns, i);
                    });
                });
                if (post.ratedByUser != null) {
                    rateIconBtns.slice(0, post.ratedByUser).forEach(btn => {
                        btn.classList.add('bi-star-fill');
                        btn.classList.remove('bi-star');
                    });
                    rateIconBtns[post.ratedByUser - 1].classList.add('active');
                }
                document.getElementById('post-wrap').innerHTML = "";
                document.getElementById('post-wrap').appendChild(clone);
                document.querySelectorAll('#mc-close, #get_chapters').forEach(function (element) {
                    element.addEventListener("click", open_close_chapters_modal);
                    element.addEventListener("touchstart", open_close_chapters_modal);
                });
                window.createSkeletons("post-commentsection");
                window.fetchComments("post", postId, commentSection);
                document.getElementById('addCommentToPost').addEventListener('click', function () {
                    window.AddComment(JSON.stringify({
                        Body: document.getElementById('commentBody').value,
                        TargetPostId: postId
                    }), commentSection);
                });
                const chapterlist = document.getElementById('modalchapters-list');
                chapterlist.innerHTML = "";
                if (post.chapters.length > 0) {
                    post.chapters.sort((a, b) => a.chapterIndex - b.chapterIndex);
                    post.chapters.forEach((chapter) => chapterlist.innerHTML +=
                        "<li><a href='/p/" + post.id + "/" + chapter.chapterIndex + "'>" + chapter.title + "</a></li>");
                }
            }
        });
    }
    const fsc_close = document.querySelectorAll('#fsc-wrap, #fsc-close');
    fsc_close.forEach(function (element) {
        element.addEventListener("click", function () {
            if (fullsizecover.classList.contains('dblock')) {
                fullsizecover.classList.remove('dblock');
            }
        });
    });
    commentSection.addEventListener('click', function (e) {
        const target = e.target;
        if (target.classList.contains('c-menu')
            || target.parentElement.classList.contains('c-menu')) {
            const menu = target.closest('.comment').querySelector('.c-menupopup');
            if (menu.classList.contains('dblock')) {
                menu.classList.remove('dblock');
            }
            else {
                closeAllCommentMenus();
                menu.classList.add('dblock');
            }
        }
    });
    function closeAllCommentMenus() {
        commentSection.querySelectorAll('.c-menupopup').forEach(menu => {
            if (menu.classList.contains('dblock')) {
                menu.classList.remove('dblock');
            }
        });
    }
    function closeChaptersModal() {
        if (chaptersModal !== null && chaptersModal.classList.contains('dflex')) {
            chaptersModal.classList.remove('dflex');
            modalbg1.classList.remove('dblock');
        }
    }
    function open_close_chapters_modal() {
        if (chaptersModal.classList.contains('dflex')) {
            closeChaptersModal();
        }
        else {
            chaptersModal.classList.add('dflex');
            modalbg1.classList.add('dblock');
        }
    }
    async function RateThePost(rateVal, rateIconBtns, i) {
        const ratePayload = {
            PostId: postId,
            RateValue: rateVal
        };
        await fetch("/Action/RateThePost", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ratePayload)
        })
            .then((res) => res.json())
            .then((data) => {
            rateIconBtns.forEach(btn => {
                btn.classList.remove('bi-star-fill');
                btn.classList.remove('active');
                btn.classList.add('bi-star');
            });
            const active = i.classList.contains('active');
            if (data.statusCode === 200 && !active) {
                rateIconBtns.slice(0, rateVal).forEach(btn => {
                    btn.classList.add('bi-star-fill');
                    btn.classList.remove('bi-star');
                });
                i.classList.add('active');
            }
            else if (data.statusCode === 202) {
            }
            else {
                console.log("Server error -> " + data.statusCode);
            }
        })
            .catch(error => { console.log('Fetch failed -> ' + error); });
    }
});
