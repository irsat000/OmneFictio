

$(document).ready(function () {
    document.querySelector('.modalbg1').addEventListener("click", function () {
        var oldFunc = modalbg1_click;
        return modalbg1_click_post();
    });
    const postId = document.getElementById('postid').value;
    const commentSection = document.getElementById('comment-section');
    const modalbg1 = document.getElementsByClassName('modalbg1')[0];
    const repliesModal = document.getElementById('modal-replies');
    const chaptersModal = document.getElementById('modal-chapters');
    CheckRateByUser();
    fetchComments();


    document.getElementById('addCommentToPost').addEventListener('click', function () {
        AddComment({
            Body: document.getElementById('commentBody').value,
            TargetPostId: postId
        });
    });
    async function AddComment(payload) {
        //Adds a new comment
        await fetch("/Action/AddComment", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then((res) => res.json())
            .then(async (data) => {
                if (data.statusCode === 200) {
                    const comment = JSON.parse(data.value).returnComment;
                    console.log(comment);
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
                } else if (data.statusCode === 499) {
                } else {
                }
            })
            .catch(error => {
                console.log('Fetch failed -> ' + error);
            });
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
                        }
                    })
                    .catch(error => {
                        console.log('Fetch failed -> ' + error);
                    });
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


    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('get_replies') ||
            (e.target.parentElement != null &&
                e.target.parentElement.classList.contains('get_replies'))) {
            openRepliesModal(e.target);
        }
        else if (e.target.classList.contains('mr-close') ||
            (e.target.parentElement != null &&
                e.target.parentElement.classList.contains('mr-close'))) {
            closeRepliesModal();
        }
    });


    const chapterModalBtns = [document.getElementById('mc-close'), document.getElementById('get_chapters')];
    chapterModalBtns.forEach(function (element) {
        element.addEventListener("click", open_close_chapters_modal);
        element.addEventListener("touchstart", open_close_chapters_modal);
    });
    function open_close_chapters_modal(){
        if (chaptersModal.classList.contains('d-flex')) {
            closeChaptersModal();
        }
        else {
            chaptersModal.classList.add('d-flex');
            modalbg1.classList.add('d-block');
        }
    }


    async function fetchComments() {
        await fetch("/g/GetComments/" + postId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then(async (data) => {
                if (data.statusCode === 200) {
                    const instance = document.getElementById('comment_instance');
                    for(const comment of JSON.parse(data.value)){
                        const clone = instance.content.cloneNode(true);
                        const checkvotepayload = "TargetId=" + comment.id + "&TargetType=comment";
                        //Check if user voted this parent
                        await window.checkVoted_IconStuff(clone, checkvotepayload);

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
                        const hreply = await fetchHighlightedReply(comment.id);
                        if (hreply) {
                            //Check if user voted this parent
                            const checkvotepayload_reply = "TargetId=" + hreply.id + "&TargetType=reply";
                            await window.checkVoted_IconStuff(clone.querySelector('.reply'), checkvotepayload_reply);

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
                        commentSection.appendChild(clone);
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
    async function fetchReplies(commentId) {
        //cancel pending request if there is one
        if (frController) {
            frController.abort();
        }
        //new controller for new request
        frController = new AbortController();
        const frSignal = frController.signal;
        await fetch("/g/GetComment/" + commentId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            signal: frSignal
        })
            .then((res) => res.json())
            .then(async (data) => {
                if (data.statusCode === 200) {
                    const comm = JSON.parse(data.value);
                    const modalRepliesBody = document.querySelector('#modal-replies > .mr-body');
                    const commentInstance = document.getElementById('modalReplies-comment');
                    const commentClone = commentInstance.content.cloneNode(true);
                    //Check if user voted this parent
                    const checkvotepayload = "TargetId=" + comm.id + "&TargetType=comment";
                    await window.checkVoted_IconStuff(commentClone, checkvotepayload);

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
                    modalRepliesBody.appendChild(commentClone);
                    //if it has replies
                    if (comm.replies.length > 0) {
                        const replyInstance = document.getElementById('modalReplies-reply');
                        for(const reply of comm.replies){
                            const replyClone = replyInstance.content.cloneNode(true);
                            //Check if user voted this parent
                            const checkvotepayload_reply = "TargetId=" + reply.id + "&TargetType=reply";
                            await window.checkVoted_IconStuff(replyClone, checkvotepayload_reply);

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
                            modalRepliesBody.appendChild(replyClone);
                        };
                    }
                }
            })
            .catch(error => console.log('Fetching reply method is at fault', error));
    }

    


    function openRepliesModal(element) {
        var commentId = element.closest('.comment')
            .getAttribute('data-commentid');
        if (!repliesModal.classList.contains('d-flex')) {
            repliesModal.classList.add('d-flex');
            modalbg1.classList.add('d-block');
            document.querySelector('#modal-replies > .mr-body').innerHTML = "";
            fetchReplies(commentId);
        }
    }


    function modalbg1_click_post() {
        closeRepliesModal();
        closeChaptersModal();
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
        }
    }
    function closeChaptersModal() {
        const modalbg1 = document.querySelector('.modalbg1');
        const chaptersModal = document.getElementById('modal-chapters');
        if (chaptersModal !== null && chaptersModal.classList.contains('d-flex')) {
            chaptersModal.classList.remove('d-flex');
            modalbg1.classList.remove('d-block');
        }
    }




});