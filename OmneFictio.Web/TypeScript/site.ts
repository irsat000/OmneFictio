// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

//Utility classes
class JustBody {
    body!: string;
}
class Tag {
    id!: number;
    body!: string;
    userGenerated!: boolean;
}
class ExistingStories {
    body!: string;
    storyType!: JustBody;
}
class Language {
    lanCode!: string;
    body!: string;
}
class PostGift {
    sentDate!: Date;
    item!: JustBody;
}
class Authority {
    code!: string;
    body!: string;
}
//-----
class ofAccount_P {
    id!: number;
    username!: string;
    displayName!: string | null;
    profilePic!: string | null;
    selfDesc!: string | null;
    deletedStatus!: JustBody | null;
    authorities!: Authority[] | null;
}
class ofChapter {
    id!: number;
    title!: string;
    chapterIndex!: string;
    isPublished!: string;
}
class ofPost_1 {
    id!: number;
    title!: string;
    postDescription!: string;
    publishDate!: Date;
    updateDate!: Date;
    coverImage!: string | null;
    account!: ofAccount_P | null;
    deletedStatus!: JustBody | null;
    language!: Language;
    postStatus!: JustBody;
    postType!: JustBody;
    ratedAs!: JustBody;
    chapters!: ofChapter[] | null;
    postGifts!: PostGift[] | null;
    tags!: Tag[] | null;
    existingStories!: ExistingStories[] | null;
    voteResult!: number;
    rateResult!: number;
    comRepLength!: number;
    wordsLength!: number;
    votedByUser!: boolean | null;
    ratedByUser!: number | null;
}
class ofComment_1 {
    id!: number;
    body!: string;
    publishDate!: Date;
    updateDate!: Date;
    account!: ofAccount_P | null;
    targetPostId!: number | null;
    repliesLength!: number;
    voteResult!: number;
    votedByUser!: boolean | null;
    highlightedReply!: ofReply_1 | null;
}
class ofReply_1 {
    id!: number;
    body!: string;
    publishDate!: Date;
    updateDate!: Date;
    account!: ofAccount_P | null;
    voteResult!: number;
    votedByUser!: boolean | null;
}

class ofRead_GetPosts {
    posts!: ofPost_1[];
    pages!: number;
}

//let modalbg1_click_site: () => void;

document.addEventListener("DOMContentLoaded", function () {
    const dombody = document.getElementsByTagName("BODY")[0] as HTMLBodyElement;
    const modalbg1 = document.querySelector('.modalbg1') as HTMLDivElement;
    const drawer = document.getElementById('drawer') as HTMLDivElement;
    const loginModal = document.getElementById('login-modal') as HTMLFormElement;
    const acDropdown = document.querySelector('.account-dropdown') as HTMLDivElement;
    const repliesModal = document.getElementById('modal-replies') as HTMLDivElement;

    document.addEventListener("click", function (e) {
        //Close account dropdown if clicked somewhere else
        if (acDropdown.classList.contains('dflex') &&
            (<HTMLElement>e.target).closest('.account-cont') == null) {
            acDropdown.classList.remove('opacity1');
            setTimeout(function () {
                acDropdown.classList.remove('dflex');
            }, 100);
        }
    });

    //close modals, dropdowns, drawer etc when user click on the dark background
    modalbg1.addEventListener("click", function () {
        if (drawer !== null && drawer.classList.contains('drawer-active')) {
            drawer.classList.remove('drawer-active');
            modalbg1.classList.remove('dblock');
        }
        if (loginModal !== null && loginModal.classList.contains('dflex')) {
            loginModal.classList.remove('dflex');
            modalbg1.classList.remove('dblock');
        }
        window.closeRepliesModal();
    });

    //Theme switch
    document.getElementById("theme-check")?.addEventListener("change", (e) => {
        const body = document.getElementsByTagName("body")[0];
        body.className = "";

        if ((<HTMLInputElement>e.currentTarget).checked) {
            body.classList.add("lightmode");
        } else {
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
        })
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

    //Close replies modal
    document.querySelector('.mr-close')?.addEventListener('click', function () {
        window.closeRepliesModal();
    });









    //login modal - fetch api
    loginModal.addEventListener('submit', async function (event) {
        //disables redirection of form element
        event.preventDefault();
        //Get message elements
        const message = loginModal.querySelector('#loginmodal-message')!;
        const success = loginModal.querySelector('#loginmodal-success')!;
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


    //I might give this function to the like-dislike buttons when I create them from template
    //Vote - fetch api
    document.addEventListener('click', function (e) {
        if ((<HTMLElement>e.target).classList.contains('likebtn') ||
            (<HTMLElement>e.target).classList.contains('dislikebtn')) {
            const btn = e.target as HTMLElement;
            const action = btn.getAttribute('data-action');
            const targetType = btn.getAttribute('data-target_type');
            let targetIdValue: string;
            switch (targetType) {
                case "post":
                    targetIdValue = btn.closest('[data-postid]')!
                        .getAttribute('data-postid')!;
                    break;
                case "comment":
                    targetIdValue = btn.closest('[data-commentid]')!
                        .getAttribute('data-commentid')!;
                    break;
                case "reply":
                    targetIdValue = btn.closest('[data-replyid]')!
                        .getAttribute('data-replyid')!;
                    break;
                case "chapter":
                    targetIdValue = btn.closest('[data-chid]')!
                        .getAttribute('data-chid')!;
                    break;
                default:
                    return;
            }
            if (targetIdValue !== null) {
                const targetId = parseInt(targetIdValue, 10);
                let vote = false;
                if (action === "like") { vote = true; }
                const data = { targetId: targetId, body: vote, targetType: targetType };
                VoteRequest(btn, data);
            }
        }
    });


});



//--------COMMENT SECTION-------

async function AddComment(payload: string, commentSection: HTMLDivElement) {
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
                const instance = document.getElementById('comment_instance') as HTMLTemplateElement;
                const clone = window.cloneFromTemplate(instance);

                clone.querySelector('.comment')!.setAttribute('data-commentid', comment.id);
                clone.querySelector('.c-header > img')!.setAttribute('src', '/images/users/' + comment.account.profilePic);
                if (comment.account.displayName != null) {
                    clone.querySelector('.c-username')!.textContent = comment.account.displayName;
                } else {
                    clone.querySelector('.c-username')!.textContent = comment.account.username;
                }
                clone.querySelector('.c-date')!.textContent = window.TimeAgo(comment.publishDate);
                clone.querySelector('.c-text > span')!.textContent = comment.body;
                if (comment.voteResult >= 0) {
                    clone.querySelector('.c-likes')!.textContent = comment.voteResult;
                }
                if (comment.repliesLength === 0) {
                    clone.querySelector('.get_replies')!.remove();
                } else {
                    let repliesLengthText = " replies";
                    if (comment.repliesLength === 1) {
                        repliesLengthText = " reply";
                    }
                    clone.querySelector('.get_replies > span')!.textContent = comment.repliesLength + repliesLengthText;
                }
                clone.querySelector('.reply')!.remove();
                //add comment to the comment section
                commentSection.insertBefore(clone, commentSection.firstChild);
                //clear commenting body
                (<HTMLInputElement>document.getElementById('commentBody')).value = "";
            }
        })
        .catch(error => { console.log('Fetch failed -> ' + error); });
}
function openRepliesModal(commentId: string) {
    const modalbg1 = document.querySelector('.modalbg1') as HTMLDivElement;
    const repliesModal = document.getElementById('modal-replies') as HTMLDivElement;
    if (document.getElementById('comment_instance') == null) {
        return;
    }
    if (!repliesModal.classList.contains('dflex')) {
        repliesModal.classList.add('dflex');
        modalbg1.classList.add('dblock');
        const replySection = repliesModal.querySelector('.mr-body') as HTMLElement;
        fetchReplies(commentId, replySection);
    }
}
function closeRepliesModal() {
    const modalbg1 = document.querySelector('.modalbg1') as HTMLDivElement;
    const repliesModal = document.getElementById('modal-replies') as HTMLDivElement;
    if (repliesModal.classList.contains('dflex')) {
        repliesModal.classList.remove('dflex');
        modalbg1.classList.remove('dblock');
        if (frController) {
            frController.abort();
        }
        repliesModal.querySelector('.mr-body')!.innerHTML = "";
    }
}

async function fetchComments(type: string, parentid: string, section: HTMLElement) {
    await fetch("/g/GetComments/" + type + "/" + parentid, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then((res) => res.json())
        .then(async (data) => {
            section.innerHTML = "";
            if (data.statusCode === 200) {
                for (const comment of JSON.parse(data.value)) {
                    section.appendChild(await fillCommentTemplate(comment, null));
                };
            }
        })
        .catch(error => {
            section.innerHTML = "";
            console.log('Fetch failed -> ' + error);
        });
}

function fetchHighlightedReply(commentId: string) {
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

let frController: AbortController | null;
async function fetchReplies(commentId: string, section: HTMLElement) {
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
                const commentInstance = document.getElementById('modalReplies-comment') as HTMLTemplateElement;
                const replyInstance = document.getElementById('modalReplies-reply') as HTMLTemplateElement;
                const commentClone = window.cloneFromTemplate(commentInstance);

                //Check if user voted this parent
                window.checkVoted_icons(commentClone, comm.votedByUser);

                commentClone.querySelector('.mr-comment')!.setAttribute('data-commentid', comm.id);
                commentClone.querySelector('.mrc-header > img')!.setAttribute('src', '/images/users/' + comm.account.profilePic);
                if (comm.account.displayName != null) {
                    commentClone.querySelector('.mrc-username')!.textContent = comm.account.displayName;
                } else {
                    commentClone.querySelector('.mrc-username')!.textContent = comm.account.username;
                }
                commentClone.querySelector('.mrc-date')!.textContent = window.TimeAgo(comm.publishDate);
                commentClone.querySelector('.mrc-text > span')!.textContent = comm.body;
                if (comm.voteResult >= 0) {
                    commentClone.querySelector('.mrc-likes')!.textContent = comm.voteResult;
                }
                section.appendChild(commentClone);

                //if it has replies
                if (comm.replies.length > 0) {
                    for (const reply of comm.replies) {
                        const replyClone = window.cloneFromTemplate(replyInstance);
                        //Check if user voted this parent
                        window.checkVoted_icons(replyClone, reply.votedByUser);

                        replyClone.querySelector('.mr-reply')!.setAttribute('data-replyid', reply.id);
                        replyClone.querySelector('.mrr-header > img')!.setAttribute('src', '/images/users/' + reply.account.profilePic);
                        if (reply.account.displayName != null) {
                            replyClone.querySelector('.mrr-username')!.textContent = reply.account.displayName;
                        } else {
                            replyClone.querySelector('.mrr-username')!.textContent = reply.account.username;
                        }
                        replyClone.querySelector('.mrr-date')!.textContent = window.TimeAgo(reply.publishDate);
                        replyClone.querySelector('.mrr-text > span')!.textContent = reply.body;
                        if (reply.voteResult >= 0) {
                            replyClone.querySelector('.mrr-likes')!.textContent = reply.voteResult;
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




async function VoteRequest(btn: HTMLElement, data: any) {
    var action = data.body ? "like" : "dislike";

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
                console.log("Vote error status -> " + data.statusCode);
            }
        })
        .catch(error => console.log('Vote function failed.', error));
}


function voting_visual(btn: HTMLElement, action: string) {
    console.log(btn);
    console.log(action);
    let btnSibling = action === "like"
        ? btn.parentElement!.querySelector('.dislikebtn') as HTMLElement
        : btn.parentElement!.querySelector('.likebtn') as HTMLElement;

    //Increase/Decrease vote count
    const showVoteCount = btn.parentElement!.querySelector('.vote_count') as HTMLElement;
    //bv = base vote
    let bvInputVal = showVoteCount.textContent !== "--"
        ? parseInt(showVoteCount.textContent!, 10) as number
        : null;
    if (bvInputVal !== null) {
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

function checkVoted_icons(clone: HTMLElement, val: boolean | null) {
    const likebtn = clone.querySelector('[data-action="like"]') as HTMLElement;
    const dislikebtn = clone.querySelector('[data-action="dislike"]') as HTMLElement;
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
async function googleHandleCredentialResponse(response: any) {
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

function createSkeletons(page: string) {
    const postSkelTemplate = document.getElementById("postSkeleton") as HTMLTemplateElement;
    const commentSkelTemplate = document.getElementById("commentSkeleton") as HTMLTemplateElement;

    switch (page) {
        case "index-topposts":
            //Creates top post skeletons for index page
            const index_todays = document.querySelector('.todaytop_body') as HTMLDivElement;
            const index_months = document.querySelector('.monthtop_body') as HTMLDivElement;
            for (let i = 0; i < 5; i++) {
                index_todays.appendChild(window.cloneFromTemplate(postSkelTemplate));
                index_months.appendChild(window.cloneFromTemplate(postSkelTemplate));
            }
            break;
        case "read-posts":
            //Creates post skeletons for read page
            const pl_column1 = document.getElementById('pl-column1') as HTMLDivElement;
            const pl_column2 = document.getElementById('pl-column2') as HTMLDivElement;
            for (let i = 0; i < 6; i++) {
                pl_column1.appendChild(window.cloneFromTemplate(postSkelTemplate));
                pl_column2.appendChild(window.cloneFromTemplate(postSkelTemplate));
            }
            break;
        case "post-commentsection":
        case "chapter-commentsection":
            //Creates comment skeletons for post or chapter's comment section
            const post_commentsection = document.getElementById("comment-section") as HTMLDivElement;
            for (let i = 0; i < 10; i++) {
                const clone = window.cloneFromTemplate(commentSkelTemplate);
                post_commentsection.appendChild(clone);
            }
            break;
        case "profile-posts":
        case "profile-saved":
            //Creates post skeletons for the user posts or saved posts in profile
            const profilebody_forpost = document.getElementById(page) as HTMLDivElement;
            for (let i = 0; i < 10; i++) {
                const clone = window.cloneFromTemplate(postSkelTemplate);
                profilebody_forpost.appendChild(clone);
            }
            break;
        case "profile-reviews":
            //Creates review(comment to posts) skeletons in profile
            const profilebody_forreviews = document.getElementById(page) as HTMLDivElement;
            for (let i = 0; i < 10; i++) {
                const clone = window.cloneFromTemplate(commentSkelTemplate);
                profilebody_forreviews.appendChild(clone);
            }
            break;
        default:
            break;
    }
}

function fillPostTemplate(post: ofPost_1) {
    const instance = document.getElementById('postList-post') as HTMLTemplateElement;
    const clone = window.cloneFromTemplate(instance);

    //Check if user voted this parent
    window.checkVoted_icons(clone, post.votedByUser!);
    //Main elements
    const container = clone.querySelector('.post') as HTMLDivElement;
    const title = clone.querySelector('.p-title > a') as HTMLAnchorElement;
    const publishDate = clone.querySelector('.p-date') as HTMLSpanElement;
    const coverImg = clone.querySelector('.p-cover > img') as HTMLImageElement;
    const body = clone.querySelector('.p-body > span') as HTMLSpanElement;
    const voteCount = clone.querySelector('.vote_count') as HTMLSpanElement;
    const rate = clone.querySelector('.p-rate') as HTMLSpanElement;
    const username = clone.querySelector('.p-username') as HTMLSpanElement;
    const userImg = clone.querySelector('.p-user > img') as HTMLImageElement;
    //Important details
    const type = clone.querySelector('.pi-type') as HTMLSpanElement;
    const language = clone.querySelector('.pi-language') as HTMLSpanElement;
    const status = clone.querySelector('.pi-status') as HTMLSpanElement;
    const readerRating = clone.querySelector('.pi-rating') as HTMLSpanElement;
    const tagSection = clone.querySelector('.pi-tags') as HTMLElement;
    const seriesSection = clone.querySelector('.pi-series') as HTMLElement;
    //Additional information
    const chapterAmount = clone.querySelector('.pi-amount_of_chapters') as HTMLSpanElement;
    const wordAmount = clone.querySelector('.pi-amount_of_words') as HTMLSpanElement;
    const commentAmount = clone.querySelector('.pi-amount_of_comments') as HTMLSpanElement;
    const updateDate = clone.querySelector('.pi-last_update') as HTMLSpanElement;
    //Populating
    container.setAttribute('data-postid', post.id.toString());
    title.href = '/p/' + post.id + '?lp=' + window.location.href;;
    title.textContent = post.title;
    publishDate.textContent = window.TimeAgo(post.publishDate);
    body.textContent = post.postDescription;
    if (post.coverImage !== null) {
        coverImg.src = '/images/covers/' + post.coverImage;
    } else {
        coverImg.parentElement!.remove();
    }
    if (post.voteResult >= 0) {
        voteCount.textContent = post.voteResult.toString();
    }
    rate.textContent = post.rateResult >= 0 && post.rateResult <= 10
        ? Number((post.rateResult).toFixed(1)) + "/10"
        : "-/10";
    type.textContent = post.postType.body;
    language.textContent = post.language.body;
    status.textContent = post.postStatus.body;
    readerRating.textContent = post.ratedAs.body;
    if(post.chapters !== null){
        chapterAmount.textContent = post.chapters.length.toString();
    }
    else {
        chapterAmount.textContent = "0";
    }
    wordAmount.textContent = post.wordsLength.toString();
    commentAmount.textContent = post.comRepLength.toString();
    updateDate.textContent = window.TimeAgo(post.updateDate, "short");
    //tag list
    if (post.tags !== null && post.tags.length > 0) {
        post.tags.forEach((tagname: Tag) =>
            tagSection.innerHTML += "<span>" + tagname.body + "</span>"
        );
    } else {
        tagSection.innerHTML = "<span>Empty</span>";
    }
    //based on list
    if (post.existingStories !== null && post.existingStories.length > 0) {
        post.existingStories!.forEach((storyname: any) =>
            seriesSection.innerHTML += "<span>" + storyname.body + "</span>"
        );
    } else {
        seriesSection.remove();
    }
    //user
    if (post.account !== null) {
        username.textContent = post.account.displayName !== null
            ? post.account.displayName!
            : post.account.username;
        if (post.account.profilePic !== null) {
            userImg.src = '/images/users/' + post.account.profilePic;
        } else {
            userImg.remove();
        }
    } else {
        username.textContent = "[Deleted]";
        userImg.remove();
    }

    return clone;
}


async function fillCommentTemplate(comment: ofComment_1, page: string | null) {
    const instance = document.getElementById('comment_instance') as HTMLTemplateElement;
    const clone = window.cloneFromTemplate(instance);
    //Check if user voted this parent
    window.checkVoted_icons(clone, comment.votedByUser);

    //Comment elements
    const cContainer = clone.querySelector('.comment') as HTMLDivElement;
    const cUserImg = clone.querySelector('.c-header > img') as HTMLImageElement;
    const cUsername = clone.querySelector('.c-username') as HTMLSpanElement;
    const cPublishDate = clone.querySelector('.c-date') as HTMLSpanElement;
    const cBody = clone.querySelector('.c-text > span') as HTMLSpanElement;
    const cEvaluation = clone.querySelector('.c-evaluation') as HTMLDivElement;
    const cVoteCount = clone.querySelector('.c-likes') as HTMLSpanElement;
    const cGetRepliesBtn = clone.querySelector('.get_replies') as HTMLDivElement;
    const cReplyBtn = clone.querySelector('.c-replybtn') as HTMLAnchorElement;
    //Highlighted reply elements
    const rContainer = clone.querySelector('.reply') as HTMLDivElement;
    const rBody = clone.querySelector('.r-text > span') as HTMLSpanElement;
    const rVoteCount = clone.querySelector('.r-likes') as HTMLSpanElement;
    const rUserImg = clone.querySelector('.r-user > img') as HTMLImageElement;
    const rUsername = clone.querySelector('.r-username') as HTMLSpanElement;

    //Populate comment
    cContainer.setAttribute('data-commentid', comment.id.toString());
    cUserImg.src = '/images/users/' + comment.account!.profilePic;

    //NULL CHECK FOR ACCOUNT WILL BE CODED
    cUsername.textContent = comment.account!.displayName !== null
        ? comment.account!.displayName
        : comment.account!.username;
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
        cGetRepliesBtn.firstChild!.textContent = comment.repliesLength + repliesLengthText;
        cGetRepliesBtn.addEventListener('click', () => window.openRepliesModal(comment.id.toString()));
    }
    //Get and populate highlighted reply
    const hreply = comment.highlightedReply; //await fetchHighlightedReply(comment.id.toString()) as ofReply_1 | null;
    if (hreply) {
        //Check if user voted this parent
        window.checkVoted_icons(rContainer, hreply.votedByUser);
        rContainer.setAttribute('data-replyid', hreply.id.toString());
        rBody.textContent = hreply.body;
        if (hreply.voteResult >= 0) {
            rVoteCount.textContent = hreply.voteResult.toString();
        }
        rUserImg.src = '/images/users/' + hreply.account!.profilePic;

        //NULL CHECK FOR ACCOUNT WILL BE CODED
        rUsername.textContent = hreply.account!.displayName != null
            ? hreply.account!.displayName
            : hreply.account!.username;
    }
    else {
        clone.querySelector('.reply')!.remove();
    }
    //If the comments in the context are in profile page, then show "link to post"
    if (page === "profile") {
        cReplyBtn.remove();
        let linkToPost = document.createElement('a');
        linkToPost.href = "/p/" + comment.targetPostId + "?cid=" + comment.id; //targetPostId can be empty normally but reviews are only post comments so there is no chance of fail
        linkToPost.textContent = "Post";
        cEvaluation.appendChild(linkToPost);
    }

    return clone;
}




//UTILITY

function strfForm(form: HTMLFormElement): string {
    const formData = new FormData(form);
    const object = Object.fromEntries(formData.entries());
    return JSON.stringify(object);
}
function strfForm2(formData: any): string {
    const object = Object.fromEntries(formData);
    return JSON.stringify(object);
}
function strfForm3(form: HTMLFormElement): string {
    const formData = new FormData(form);
    let object: any = {};
    formData.forEach(function (value, key) {
        object[key] = value;
    });
    return JSON.stringify(object);
}

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function TimeAgo(time: any, wordType: string = "long") { //Date MIGHT NOT BE THE RIGHT TYPE
    const periods = {
        month: 30 * 24 * 60 * 60 * 1000,
        week: 7 * 24 * 60 * 60 * 1000,
        day: 24 * 60 * 60 * 1000,
        hour: 60 * 60 * 1000,
        minute: 60 * 1000
    };
    const diff = Date.now() - <any>new Date(time);
    let val;
    let attachment = "";
    if (diff > periods.month) {
        val = Math.floor(diff / periods.month);
        if (wordType === "long") {
            attachment = "month"
        } else {
            attachment = "mo"
        }
    }
    else if (diff > periods.week) {
        val = Math.floor(diff / periods.week);
        if (wordType === "long") {
            attachment = "week"
        } else {
            attachment = "w"
        }
    }
    else if (diff > periods.day) {
        val = Math.floor(diff / periods.day);
        if (wordType === "long") {
            attachment = "day"
        } else {
            attachment = "d"
        }
    }
    else if (diff > periods.hour) {
        val = Math.floor(diff / periods.hour);
        if (wordType === "long") {
            attachment = "h"
        } else {
            attachment = "h"
        }
    }
    else if (diff > periods.minute) {
        val = Math.floor(diff / periods.minute);
        if (wordType === "long") {
            attachment = "m"
        } else {
            attachment = "m"
        }
    } else {
        if (wordType === "long") {
            return "Just now";
        } else {
            return "Now";
        }
    }

    if (val > 1 && wordType === "long") {
        attachment += "s ago";
    } else if (val === 1 && wordType === "long") {
        attachment += " ago";
    }

    return val + " " + attachment;
}

function getPathPart(index: number) {
    const pathname = window.location.pathname;
    const slashindex = pathname.split('/', index).join('/').length;
    let getval = pathname.substring(pathname.indexOf('/') + slashindex + 1);
    if (getval.includes("/")) {
        getval = getval.substring(0, getval.indexOf('/'));
    }
    return getval;
}

function cloneFromTemplate(instance: HTMLTemplateElement) {
    return instance.content.cloneNode(true) as HTMLElement;
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
