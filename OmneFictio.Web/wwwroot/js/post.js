
$(document).ready(function () {
    var commentMenuBtns = document.querySelectorAll('.c-menu');
    commentMenuBtns.forEach(function (element) {
        element.addEventListener("click", function () {
            const menu = element.closest('.c-header')
                .querySelector('.c-menupopup');
            if (menu.classList.contains('d-block')) {
                menu.classList.remove('d-block');
            } else {
                menu.classList.add('d-block');
            }
        });
    }); //will be transfered to document.onclick because these are appended elements.

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
            closeRepliesModal(e.target);
        }
    });


    const chapterModalBtns = [document.getElementById('mc-close'), document.getElementById('get_chapters')];
    chapterModalBtns.forEach(function (element) {
        element.addEventListener("click", function () {
            if (chaptersModal.classList.contains('d-flex')) {
                chaptersModal.classList.remove('d-flex');
                modalbg1.classList.remove('d-block');
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
            .then((data) => {
                //console.log(data.statusCode);
                if (data.statusCode === 200) {
                    //console.log(data.value);
                    const instance = document.getElementById('comment_instance');
                    data.value.forEach(async (comment) => {
                        const clone = instance.content.cloneNode(true);
                        clone.querySelector('.comment').id = comment.id;
                        if (comment.account.displayName != null) {
                            clone.querySelector('.c-username').textContent = comment.account.displayName;
                        } else {
                            clone.querySelector('.c-username').textContent = comment.account.username;
                        }
                        clone.querySelector('.c-date').textContent = TimeAgo(comment.publishDate);
                        clone.querySelector('.c-text > span').textContent = comment.body;
                        if (comment.voteResult >= 0) {
                            clone.querySelector('.c-likes').textContent = comment.voteResult;
                        } else {
                            clone.querySelector('.c-likes').textContent = "--";
                        }
                        if (comment.repliesLength > 0) {
                            clone.querySelector('.get_replies > span').textContent = comment.repliesLength + " replies";
                        } else {
                            clone.querySelector('.get_replies > span').textContent = "No reply";
                        }

                        const hreply = await fetchHighlightedReply(comment.id);
                        if (hreply.hasOwnProperty('id')) {
                            clone.querySelector('.reply').id = hreply.id;
                            clone.querySelector('.r-text > span').textContent = hreply.body;
                            if (hreply.voteResult >= 0) {
                                clone.querySelector('.r-likes').textContent = hreply.voteResult;
                            } else {
                                clone.querySelector('.r-likes').textContent = "--";
                            }
                            if (hreply.account.displayName != null) {
                                clone.querySelector('.r-username').textContent = hreply.account.displayName;
                            } else {
                                clone.querySelector('.r-username').textContent = hreply.account.username;
                            }
                        }
                        else{
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


    async function fetchReplies(commentId) {
        await fetch("/g/GetComment/" + commentId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.statusCode === 200) {
                    const comm = data.value;
                    const modalRepliesBody = document.querySelector('#modal-replies > .mr-body');
                    const commentInstance = document.getElementById('modalReplies-comment');
                    const commentClone = commentInstance.content.cloneNode(true);

                    commentClone.querySelector('.mr-comment').id = comm.id;
                    if (comm.account.displayName != null) {
                        commentClone.querySelector('.mrc-username').textContent = comm.account.displayName;
                    } else {
                        commentClone.querySelector('.mrc-username').textContent = comm.account.username;
                    }
                    commentClone.querySelector('.mrc-date').textContent = TimeAgo(comm.publishDate);
                    commentClone.querySelector('.mrc-text > span').textContent = comm.body;
                    commentClone.querySelector('.mrc-likes').textContent = comm.voteResult;
                    modalRepliesBody.appendChild(commentClone);
                    //if it has replies
                    if (comm.replies.length > 0) {
                        const replyInstance = document.getElementById('modalReplies-reply');
                        comm.replies.forEach(reply => {
                            const replyClone = replyInstance.content.cloneNode(true);
                            replyClone.querySelector('.mr-reply').id = reply.id;
                            if (reply.account.displayName != null) {
                                replyClone.querySelector('.mrr-username').textContent = reply.account.displayName;
                            } else {
                                replyClone.querySelector('.mrr-username').textContent = reply.account.username;
                            }
                            replyClone.querySelector('.mrr-date').textContent = TimeAgo(reply.publishDate);
                            replyClone.querySelector('.mrr-text > span').textContent = reply.body;
                            replyClone.querySelector('.mrr-likes').textContent = reply.voteResult;
                            modalRepliesBody.appendChild(replyClone);
                        });
                    }
                }
            })
            .catch(error => console.log('Fetching reply method is at fault', error));
    }












    function openRepliesModal(element) {
        var commentId = element.closest('.comment').id;
        if (!repliesModal.classList.contains('d-flex')) {
            document.querySelector('#modal-replies > .mr-body').innerHTML = "";
            repliesModal.classList.add('d-flex');
            modalbg1.classList.add('d-block');
            fetchReplies(commentId);
        }
    }
    function closeRepliesModal(element) {
        if (repliesModal.classList.contains('d-flex')) {
            repliesModal.classList.remove('d-flex');
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