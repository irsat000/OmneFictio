

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
    window.createSkeletons("post-commentsection");
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

                    const post = JSON.parse(data.value);
                    const instance = document.getElementById('getpost_instance');
                    const clone = instance.content.cloneNode(true);

                    //Check if user voted this parent
                    window.checkVoted_icons(clone, post.votedByUser);

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
                        ? post.rateResult + "/10" : "-/10";
                    //user
                    if (post.account.displayName !== null) {
                        clone.querySelector('.p-username').innerText = post.account.displayName;
                    } else {
                        clone.querySelector('.p-username').innerText = post.account.username;
                    }
                    clone.querySelector('.p-uimg-cont > img').setAttribute('src', '/images/users/' + post.account.profilePic);

                    clone.querySelectorAll('.pd-primary > span')[0].innerText = post.postType.body;
                    clone.querySelectorAll('.pd-primary > span')[1].innerText = post.language.body;
                    clone.querySelectorAll('.pd-primary > span')[2].innerText = post.postStatus.body;
                    clone.querySelectorAll('.pd-primary > span')[3].innerText = post.ratedAs.body;

                    //get user's rate
                    if(post.ratedByUser != null){
                        document.getElementById('rate_by_user').innerText = post.ratedByUser + "/10";
                    }

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
                    //get comments right after loading the post(which is important part)
                    commentSection.innerHTML = "";
                    window.fetchComments("post", postId, commentSection);

                    document.getElementById('addCommentToPost').addEventListener('click', function () {
                        window.AddComment(JSON.stringify({
                            Body: document.getElementById('commentBody').value,
                            TargetPostId: postId
                        }), commentSection);
                    });

                    //get chapter list
                    const chapterlist = document.getElementById('modalchapters-list');
                    chapterlist.innerHTML = "";
                    if (post.chapters.length > 0) {
                        post.chapters.sort((a, b) => a.chapterIndex - b.chapterIndex);
                        post.chapters.forEach((chapter) =>
                            chapterlist.innerHTML +=
                            "<li><a href='/p/" + post.id + "/" + chapter.chapterIndex + "'>" + chapter.title + "</a></li>"
                        );
                    }
                }
            })
            .catch(error => { console.log('Fetch failed -> ' + error); });;
    }

    //----Rating the post---
    document.getElementById('rate_it_btn')
        .addEventListener('click', async function () {
            const rateVal = document.getElementById('rate_it_select').value;
            if (rateVal >= 0 && rateVal <= 10) {
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
                            if(rateVal != 0){
                                document.getElementById('rate_by_user').innerText = rateVal + "/10";
                            } else {
                                document.getElementById('rate_by_user').innerText = "--/10";
                            }
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



