

$(document).ready(function () {
    document.querySelector('.modalbg1').addEventListener("click", function () {
        var oldFunc = modalbg1_click;
        return modalbg1_click_post();
    });

    //-----full size cover------
    const fullsizecover = document.getElementById('fullsize-cover');
    const fsc_close = [document.getElementById('fsc-wrap'), document.getElementById('fsc-close')];

    document.addEventListener('click', function (e) {
        if (e.target.getAttribute('id') === "p-upscalecover" ||
            e.target.parentNode.getAttribute('id') === "p-upscalecover") {
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
            e.target.parentNode.classList.contains('c-menu')) {
            const menu = e.target.closest('.c-header')
                .querySelector('.c-menupopup');
            if (menu.classList.contains('d-block')) {
                menu.classList.remove('d-block');
            } else {
                menu.classList.add('d-block');
            }
        }
    });

    const modalbg1 = document.getElementsByClassName('modalbg1')[0];
    const repliesModal = document.getElementById('modal-replies');
    const chaptersModal = document.getElementById('modal-chapters');

    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('get_replies') ||
            e.target.parentNode.classList.contains('get_replies')) {
            openRepliesModal(e.target);
        }
        else if (e.target.classList.contains('mr-close') ||
            e.target.parentNode.classList.contains('mr-close')) {
            closeRepliesModal();
        }
    });


    const chapterModalBtns = [document.getElementById('mc-close'), document.getElementById('get_chapters')];
    chapterModalBtns.forEach(function (element) {
        element.addEventListener("click", function () {
            if (chaptersModal.classList.contains('d-flex')) {
                closeChaptersModal();
            }
            else {
                chaptersModal.classList.add('d-flex');
                modalbg1.classList.add('d-block');
            }
        });
    });


    const commentSection = document.getElementById('comment-section');
    const postId = document.getElementById('postid').value;
    fetchComments(postId);
    async function fetchComments(postId) {
        await fetch("/g/GetComments/" + postId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then(async (data) => {
                //console.log(data.statusCode);
                if (data.statusCode === 200) {
                    //console.log(data.value);
                    const instance = document.getElementById('comment_instance');
                    data.value.forEach(async (comment) => {
                        const clone = instance.content.cloneNode(true);
                        const payload = JSON.stringify({ TargetId: comment.id, TargetType: "comment" });
                        //Check if user voted this parent
                        await checkVoted_IconStuff(clone, payload);

                        clone.querySelector('.comment').setAttribute('data-commentid', comment.id);
                        if (comment.account.displayName != null) {
                            clone.querySelector('.c-username').textContent = comment.account.displayName;
                        } else {
                            clone.querySelector('.c-username').textContent = comment.account.username;
                        }
                        clone.querySelector('.c-date').textContent = TimeAgo(comment.publishDate);
                        clone.querySelector('.c-text > span').textContent = comment.body;
                        if (comment.voteResult >= 0) {
                            clone.querySelector('.c-likes').textContent = comment.voteResult;
                            clone.querySelector('[data-base_votes]')
                                .setAttribute('data-base_votes', comment.voteResult);
                        }
                        var repliesLengthText = " replies";
                        if (comment.repliesLength < 2) {
                            repliesLengthText = " reply";
                        }
                        clone.querySelector('.get_replies > span').textContent = comment.repliesLength + repliesLengthText;
                        const hreply = await fetchHighlightedReply(comment.id);
                        if (hreply.hasOwnProperty('id')) {
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
                    });
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
                    resolve(data.statusCode === 200 ? data.value : -1);
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
            .then((data) => {
                if (data.statusCode === 200) {
                    const comm = data.value;
                    const modalRepliesBody = document.querySelector('#modal-replies > .mr-body');
                    const commentInstance = document.getElementById('modalReplies-comment');
                    const commentClone = commentInstance.content.cloneNode(true);

                    commentClone.querySelector('.mr-comment').setAttribute('data-commentid', comm.id);
                    if (comm.account.displayName != null) {
                        commentClone.querySelector('.mrc-username').textContent = comm.account.displayName;
                    } else {
                        commentClone.querySelector('.mrc-username').textContent = comm.account.username;
                    }
                    commentClone.querySelector('.mrc-date').textContent = TimeAgo(comm.publishDate);
                    commentClone.querySelector('.mrc-text > span').textContent = comm.body;
                    if (comm.voteResult >= 0) {
                        commentClone.querySelector('.mrc-likes').textContent = comm.voteResult;
                    }
                    modalRepliesBody.appendChild(commentClone);
                    //if it has replies
                    if (comm.replies.length > 0) {
                        const replyInstance = document.getElementById('modalReplies-reply');
                        comm.replies.forEach(reply => {
                            const replyClone = replyInstance.content.cloneNode(true);
                            replyClone.querySelector('.mr-reply').setAttribute('data-replyid', reply.id);
                            if (reply.account.displayName != null) {
                                replyClone.querySelector('.mrr-username').textContent = reply.account.displayName;
                            } else {
                                replyClone.querySelector('.mrr-username').textContent = reply.account.username;
                            }
                            replyClone.querySelector('.mrr-date').textContent = TimeAgo(reply.publishDate);
                            replyClone.querySelector('.mrr-text > span').textContent = reply.body;
                            if (reply.voteResult >= 0) {
                                replyClone.querySelector('.mrr-likes').textContent = reply.voteResult;
                            }
                            modalRepliesBody.appendChild(replyClone);
                        });
                    }
                }
            })
            .catch(error => console.log('Fetching reply method is at fault', error));
    }

    async function checkVoted_IconStuff(clone, payload) {
        await fetch("/HomeAction/CheckVoted", {
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
                    const likebtn = clone.querySelector('[data-action="like"]');
                    const dislikebtn = clone.querySelector('[data-action="dislike"]');
                    switch (data.value) {
                        case "true":
                            likebtn.classList.add('likebtn', 'bi-hand-thumbs-up-fill', 'active');
                            dislikebtn.classList.add('dislikebtn', 'bi-hand-thumbs-down');
                            break;
                        case "false":
                            likebtn.classList.add('likebtn', 'bi-hand-thumbs-up');
                            dislikebtn.classList.add('dislikebtn', 'bi-hand-thumbs-down-fill', 'active');
                            break;
                        case "none":
                            likebtn.classList.add('likebtn', 'bi-hand-thumbs-up');
                            dislikebtn.classList.add('dislikebtn', 'bi-hand-thumbs-down');
                            break;
                        default:
                            likebtn.classList.add('bi-hand-thumbs-up');
                            dislikebtn.classList.add('bi-hand-thumbs-down');
                            break;
                    }
                }
            })
            .catch(error => {
                console.log('check_voted failed -> ' + error);
            });
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


    var periods = {
        month: 30 * 24 * 60 * 60 * 1000,
        week: 7 * 24 * 60 * 60 * 1000,
        day: 24 * 60 * 60 * 1000,
        hour: 60 * 60 * 1000,
        minute: 60 * 1000
    };
    function TimeAgo(time) {
        var diff = Date.now() - new Date(time);
        var val;
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


});