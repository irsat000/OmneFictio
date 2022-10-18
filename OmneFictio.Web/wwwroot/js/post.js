

$(document).ready(function () {
    document.querySelector('.modalbg1').addEventListener("click", function () {
        var oldFunc = modalbg1_click;
        return modalbg1_click_post();
    });

    function modalbg1_click_post() {
        closeChaptersModal();
    }

    const postId = document.getElementById('postid').value;
    const commentSection = document.getElementById('comment-section');

    GetPost();
    async function GetPost() {
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
                    CheckRateByUser();
                    window.fetchComments("post", postId, commentSection);

                    const post = JSON.parse(data.value);
                    const instance = document.getElementById('getpost_instance');
                    const clone = instance.content.cloneNode(true);

                    const checkvotepayload = "TargetId=" + post.id + "&TargetType=post";
                    //Check if user voted this parent
                    await window.checkVoted_IconStuff(clone, checkvotepayload);
                    clone.querySelector('.post-2').setAttribute('data-postid', post.id);
                    if (post.coverImage !== null) {
                        clone.querySelector('.p-basecover').setAttribute('src', '/images/covers/' + post.coverImage);
                        clone.querySelector('.p-upscalecover').setAttribute('src', '/images/covers/' + post.coverImage);
                        document.getElementById('fsc-img').setAttribute('src', '/images/covers/' + post.coverImage);
                    } else {
                        clone.querySelector('.p-cover').remove();
                    }
                    clone.querySelector('.p-title').innerText = post.title;
                    clone.querySelector('.p-date').innerText = window.TimeAgo(post.publishDate);
                    clone.querySelector('.p-description').innerText = post.postDescription;
                    if (post.voteResult >= 0) {
                        clone.querySelector('.vote_count').innerText = post.voteResult;
                    }
                    clone.querySelector('.p-rate').innerText = post.rateResult >= 0 && post.rateResult <= 10
                        ? Number((post.rateResult).toFixed(1)) + "/10"
                        : "-/10";

                    //user
                    if (post.account.displayName !== null) {
                        clone.querySelector('.p-username').innerText = post.account.displayName;
                    } else {
                        clone.querySelector('.p-username').innerText = post.account.username;
                    }
                    clone.querySelector('.p-uimg-cont > img').setAttribute('src', '/images/users/' + post.account.profilePic);

                    clone.querySelectorAll('.pd-items > span')[0].innerText = post.postType.body;
                    clone.querySelectorAll('.pd-items > span')[1].innerText = post.language.body;
                    clone.querySelectorAll('.pd-items > span')[2].innerText = post.postStatus.body;
                    clone.querySelectorAll('.pd-items > span')[3].innerText = post.ratedAs.body;

                    const tagSection = clone.querySelector('.pd-tags');
                    const basedOnSection = clone.querySelector('.pd-series');
                    //tag list
                    if (post.tags.length > 0) {
                        post.tags.forEach((tagname) =>
                            tagSection.innerHTML += "<span>" + tagname.body + "</span>"
                        );
                    } else {
                        tagSection.innerHTML = "<span>Empty</span>";
                    }
                    //based on list
                    if (post.existingStories.length > 0) {
                        post.existingStories.forEach((storyname) =>
                            basedOnSection.innerHTML += "<span>" + storyname.body + "</span>"
                        );
                    } else {
                        basedOnSection.remove();
                    }

                    document.getElementById('post-wrap').appendChild(clone);

                    //get chapter list
                    const chapterlist = document.getElementById('modalchapters-list');
                    if (post.chapters.length > 0) {
                        chapterlist.innerHTML = "";
                        post.chapters.forEach((chapter) =>
                            chapterlist.innerHTML +=
                            "<li><a href=''>" + chapter.title + "</a></li>"
                        );
                    }
                }
            })
        //.catch(error => { console.log('Fetch failed -> ' + error); });;
    }

    //Fetch function that brings me the existing rate.
    async function CheckRateByUser() {
        await fetch("/g/CheckRateByUser/" + postId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.statusCode === 200) {
                    document.getElementById('rate_by_user').innerText = data.value + "/10";
                }
            })
            .catch(error => {
                console.log('Fetch failed -> ' + error);
            });
    }

    document.getElementById('addCommentToPost').addEventListener('click', function () {
        AddComment(JSON.stringify({
            Body: document.getElementById('commentBody').value,
            TargetPostId: postId
        }));
    });

    async function AddComment(payload) {
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
                    var repliesLengthText = " replies";
                    if (comment.repliesLength < 2) {
                        repliesLengthText = " reply";
                    }
                    clone.querySelector('.get_replies > span').textContent = comment.repliesLength + repliesLengthText;
                    clone.querySelector('.reply').remove();
                    //add comment to the comment section
                    commentSection.insertBefore(clone, commentSection.firstChild);
                    //clear commenting body
                    document.getElementById('commentBody').value = "";
                }
            })
            .catch(error => { console.log('Fetch failed -> ' + error); });
    }


    //----Rating the post---
    document.getElementById('rate_it_btn')
        .addEventListener('click', async function () {
            const rateVal = document.getElementById('rate_it_select').value;
            if (rateVal >= 1 && rateVal <= 10) {
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
                        if (data.statusCode === 200) {
                            document.getElementById('rate_by_user').innerText = rateVal + "/10";
                        } else {
                            console.log("Server error -> " + data.statusCode);
                        }
                    })
                    .catch(error => { console.log('Fetch failed -> ' + error); });
            }
        });
    //-------------




    //-----full size cover------
    const fullsizecover = document.getElementById('fullsize-cover');
    const fsc_close = [document.getElementById('fsc-wrap'), document.getElementById('fsc-close')];

    document.addEventListener('click', function (e) {
        if (e.target.getAttribute('id') === "p-upscalecover" ||
            (e.target.parentElement != null &&
                e.target.parentElement.getAttribute('id') === "p-upscalecover")) {
            if (!fullsizecover.classList.contains('d-block')) {
                fullsizecover.classList.add('d-block')
            }
        }
    });
    fsc_close.forEach(function (element) {
        element.addEventListener("click", function () {
            if (fullsizecover.classList.contains('d-block')) {
                fullsizecover.classList.remove('d-block')
            }
        });
    });
    //----------------------

    //open or close comment menu
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('c-menu') ||
            (e.target.parentElement != null &&
                e.target.parentElement.classList.contains('c-menu'))) {
            const menu = e.target.closest('.c-header')
                .querySelector('.c-menupopup');
            if (menu.classList.contains('d-block')) {
                menu.classList.remove('d-block');
            } else {
                menu.classList.add('d-block');
            }
        }
    });

    const chapterModalBtns = [document.getElementById('mc-close'), document.getElementById('get_chapters')];
    chapterModalBtns.forEach(function (element) {
        element.addEventListener("click", open_close_chapters_modal);
        element.addEventListener("touchstart", open_close_chapters_modal);
    });



    function closeChaptersModal() {
        const modalbg1 = document.querySelector('.modalbg1');
        const chaptersModal = document.getElementById('modal-chapters');
        if (chaptersModal !== null && chaptersModal.classList.contains('d-flex')) {
            chaptersModal.classList.remove('d-flex');
            modalbg1.classList.remove('d-block');
        }
    }

    function open_close_chapters_modal() {
        const modalbg1 = document.querySelector('.modalbg1');
        const chaptersModal = document.getElementById('modal-chapters');
        if (chaptersModal.classList.contains('d-flex')) {
            closeChaptersModal();
        }
        else {
            chaptersModal.classList.add('d-flex');
            modalbg1.classList.add('d-block');
        }
    }

});



