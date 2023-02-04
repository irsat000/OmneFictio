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
    rateResult!: number | null;
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


document.addEventListener("DOMContentLoaded", function () {
    const dombody = document.getElementsByTagName("BODY")[0] as HTMLBodyElement;
    const drawer = document.getElementById('drawer') as HTMLDivElement;
    const repliesModal = document.getElementById('modal-replies') as HTMLDivElement;
    const loginModal = document.getElementById('login-modal') as HTMLFormElement;
    const acDropdown = document.querySelector('.account-dropdown') as HTMLDivElement;
    const switchThemeModal = document.getElementById('theme-switcher-modal') as HTMLDivElement;

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
        //Close account dropdown if clicked somewhere else
        if (acDropdown.classList.contains('dflex') &&
            (<HTMLElement>e.target).closest('.account-cont') == null) {
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
        })
    });

    //Top-right account dropdown menu
    document.querySelector('.account_btn-cont')!.addEventListener("click", function () {
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

    //Open drawer (mobile)
    document.querySelectorAll('.drawerbtn-cont').forEach(btn => {
        btn.addEventListener('click', function () {
            drawer.classList.add('dblock');
            setTimeout(() => { //for transition to have an effect
                drawer.querySelector('.drawer')!.classList.add('active');
            }, 1)
        })
    }); //close drawer
    drawer.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if(target.id === 'dw-close' || target.closest('#dw-close') || target.id === 'drawer'){
            drawer.querySelector('.drawer')!.classList.remove('active');
            setTimeout(() => { //for transition to have an effect
                drawer.classList.remove('dblock');
            }, 300)
        }
    });

    //Open login modal
    document.querySelectorAll('.login-openbtn').forEach(btn => {
        btn.addEventListener('click', function () {
            loginModal.classList.add('dflex');
            setTimeout(function () {
                loginModal.classList.add('opacity1');
            }, 100);
            //Close others after opening login modal
            if (acDropdown.classList.contains('dflex')) {
                acDropdown.classList.remove('opacity1');
                acDropdown.classList.remove('dflex');
            }
            if (drawer.classList.contains('dblock')) {
                drawer.classList.remove('dblock');
                drawer.querySelector('.drawer')!.classList.remove('active');
            }
        });
    }); //Close login modal
    loginModal.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (target.id === 'lm-closebtn' || target.closest('#lm-closebtn') || target.id === 'login-modal') {
            loginModal.classList.remove('dflex');
            loginModal.classList.remove('opacity1');
        }
    });

    
    //Close replies modal
    repliesModal.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (target.id === 'mr-close' || target.closest('#mr-close') || target.id === 'modal-replies') {
            window.closeRepliesModal();
        }
    });


    //Open switch-theme modal
    document.querySelector('.ad-theme-cont > span')!.addEventListener('click', () => {
        switchThemeModal.classList.add('dflex');
        setTimeout(function () {
            switchThemeModal.classList.add('opacity1');
        }, 100);
        //Close account dropdown after opening the modal
        acDropdown.classList.remove('dflex');
        acDropdown.classList.remove('opacity1');
    }); //Close switch theme modal
    switchThemeModal.addEventListener('click', function (e) {
        const target = e.target as HTMLElement;
        if (target.id === 'ts-closebtn' || target.closest('#ts-closebtn') || target.id === 'theme-switcher-modal') {
            switchThemeModal.classList.remove('dflex');
            switchThemeModal.classList.remove('opacity1');
        }
    }); //Change theme
    switchThemeModal.querySelectorAll('ul > li').forEach(btn => {
        btn.addEventListener('click', () => {
            const selectedTheme = btn.getAttribute('data-themeval') as string;
            //close switcher modal
            switchThemeModal.classList.remove('dflex');
            switchThemeModal.classList.remove('opacity1');
            //deactivate icons from the modal (I don't need this for initialization of website)
            switchThemeModal.querySelectorAll('ul > li > i').forEach((btn) => btn.classList.remove('active'));
            //Actually change the theme with cookies, nom nom nomm
            window.localStorage.setItem("currentTheme", selectedTheme);
            //Function because this function is executed during page load too
            changeTheme(selectedTheme);
        });
    });

    function changeTheme(selectedTheme: string) {
        //change theme
        dombody.classList.forEach(cname => {
            if (themeNameMap.has(cname)) {
                dombody.classList.remove(cname);
            }
        });
        dombody.classList.add(selectedTheme);
        //show active theme
        switchThemeModal.querySelector('ul > li[data-themeval="' + selectedTheme + '"] > i')?.classList.add('active');
        const themeDisplayName = themeNameMap.get(selectedTheme);
        if (themeDisplayName !== undefined) {
            document.querySelector('.ad-theme-cont span')!.textContent = themeNameMap.get(selectedTheme)!;
        }
    }




    //login modal - fetch api
    loginModal.addEventListener('submit', function (event) {
        //disables redirection of form element
        event.preventDefault();
        //Get message elements
        const message = loginModal.querySelector('#loginmodal-message')!;
        const success = loginModal.querySelector('#loginmodal-success')!;
        message.innerHTML = "";
        //Request
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
function AddReply(payload: string) {
    //Adds a new reply
    fetch("/Action/AddReply", {
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
                const commentSection = document.getElementById('comment-section') as HTMLDivElement;
                const repliesModal = document.getElementById('modal-replies') as HTMLDivElement;
                const reply = JSON.parse(data.value).returnReply;
                repliesModal.querySelector('.mr-replies-cont')!.appendChild(window.fillReplyTemplate(reply));
                //remove add_reply fields after append
                repliesModal.querySelectorAll('.add_reply-cont').forEach(btn => btn.remove());
                //const commentId = repliesModal.querySelector('.mr-comment[data-commentid]')!.getAttribute('data-commentid');
                const comment_GetReplies = commentSection.querySelector('.comment[data-commentid="' + reply.commentId + '"] .get_replies') as HTMLDivElement;
                comment_GetReplies.style.borderRadius = "6px";
                comment_GetReplies.style.display = "block";
            }
        })
        .catch(error => { console.log('Fetch failed -> ' + error); });
}

function createAddReplyField(section: HTMLDivElement, target: string | null = null) {
    //Maybe I decide to get loggen in from the back end with the fetch up there but doesn't seem strictly necessary right now
    const pseudo_loggedUname = document.getElementById('loggedin-username')?.textContent; //pseudo
    const pseudo_loggedUId = document.getElementById('loggedin-username')?.textContent; //pseudo
    if (!pseudo_loggedUname || !pseudo_loggedUId) {
        //Not logged in, maybe tell the user to login first
        alert("Log in, please");
        return;
    }

    //remove add_reply fields to make way for new one / parent element is the modal
    section.parentElement!.querySelectorAll('.add_reply-cont').forEach(btn => btn.remove());
    //populate
    const addReplyInstance = document.getElementById('addReplyTemplate') as HTMLTemplateElement;
    const addReplyClone = window.cloneFromTemplate(addReplyInstance);
    addReplyClone.querySelector('.ar-user > img')!.setAttribute('src', '/images/users/user' + pseudo_loggedUId + '.png')
    addReplyClone.querySelector('.ar-username')!.textContent = pseudo_loggedUname;
    addReplyClone.querySelector('.cancel_addreply-btn')!.addEventListener('click', e => {
        (<HTMLElement>(e.currentTarget)).closest('.add_reply-cont')!.remove();
    });
    addReplyClone.querySelector('.send_reply-btn')!.addEventListener('click', e => {
        const btn = e.currentTarget as HTMLAnchorElement;
        const targetCommentId = btn.closest('#modal-replies')!.querySelector('.mr-comment[data-commentid]')?.getAttribute('data-commentid');
        if (!targetCommentId) {
            //maybe codes that says target comment is deleted or something
            return;
        }
        const payload = {
            body: btn.closest('.add_reply-cont')!.querySelector('.replyfieldBody')!.innerHTML,
            commentId: targetCommentId
        }
        window.AddReply(JSON.stringify(payload));
    });

    section.appendChild(addReplyClone);
    const replyCont = section.querySelector('.add_reply-cont') as HTMLDivElement;
    const replyField = section.querySelector('.add_reply-cont .replyfieldBody') as HTMLInputElement;
    if (target === null) {

    }
    else {
        replyCont.scrollIntoView();
        const targetA = document.createElement('a');
        targetA.href = '/u/' + target;
        targetA.classList.add('reply_target');
        targetA.textContent = '@' + target;
        replyField.appendChild(targetA);
        replyField.innerHTML += "&nbsp;";

        const replyTarget = replyField.querySelector('.reply_target') as HTMLAnchorElement;
        const initialTarget = replyTarget.innerHTML;
        replyField.addEventListener('keyup', (e) => {
            if (replyField.querySelector('.reply_target') && replyTarget.innerHTML.length < initialTarget.length) {
                replyField.querySelector('.reply_target')!.remove();
            }
        });
    }
    replyField.contentEditable = 'true';
    //Focus and put the cursor at the end
    replyField.focus();
    const range = document.createRange();
    range.selectNodeContents(replyField);
    range.collapse(false);
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
}

function AddComment(payload: string, commentSection: HTMLDivElement) {
    //Adds a new comment
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
                if (comment.voteResult >= 0) {
                    clone.querySelector('.c-likes')!.textContent = comment.voteResult;
                }
                //Get replies
                clone.querySelector('.reply')!.remove();
                const getRepliesBtn = clone.querySelector('.get_replies') as HTMLDivElement;
                getRepliesBtn.style.display = "none";
                getRepliesBtn.addEventListener('click', () => window.openRepliesModal(comment.id.toString()));
                //open replies to add reply btn
                clone.querySelector('.c-replybtn')!.addEventListener('click', () =>
                    window.openRepliesModal(comment.id.toString(), { replyToComment: true }));
                //body
                const commentBody = clone.querySelector('.c-text > span') as HTMLSpanElement;
                const refinedText = window.sanitizingUserInput(comment.body);
                if (refinedText.userRef) {
                    commentBody.appendChild(refinedText.userRef);
                }
                commentBody.append(refinedText.text);

                //add comment to the comment section
                commentSection.insertBefore(clone, commentSection.firstChild);
                //clear commenting body
                (<HTMLInputElement>document.getElementById('commentBody')).value = "";

            }
        })
        .catch(error => { console.log('Fetch failed -> ' + error); });
}

function fetchComments(type: string, parentid: string, section: HTMLElement) {
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
                };
            }
        })
        .catch(error => {
            section.innerHTML = "";
            console.log('Fetch failed -> ' + error);
        });
}

//---reply modal----
function closeRepliesModal() {
    const repliesModal = document.getElementById('modal-replies') as HTMLDivElement;
    repliesModal.classList.remove('dflex');
    if (frController) {
        frController.abort();
    }
    repliesModal.querySelector('.mr-body .mr-comment-cont')!.innerHTML = "";
    repliesModal.querySelector('.mr-body .mr-replies-cont')!.innerHTML = "";
}
function openRepliesModal(commentId: string, { gotoReplyId, replyToComment }: any = {}) {
    const repliesModal = document.getElementById('modal-replies') as HTMLDivElement;
    if (document.getElementById('comment_instance') == null) {
        return;
    }
    repliesModal.classList.add('dflex');
    const replySection = repliesModal.querySelector('.mr-body') as HTMLElement;
    fetchReplies(commentId, replySection, { gotoReplyId: gotoReplyId, replyToComment: replyToComment });
}
let frController: AbortController | null;
function fetchReplies(commentId: string, section: HTMLElement, { gotoReplyId, replyToComment }: any = {}) {
    const repliesModal = document.getElementById('modal-replies') as HTMLDivElement;
    const commentCont = section.querySelector('.mr-comment-cont') as HTMLDivElement;
    const repliesCont = section.querySelector('.mr-replies-cont') as HTMLDivElement;
    commentCont.innerHTML = "";
    repliesCont.innerHTML = "";
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
        .then((data) => {
            if (data.statusCode === 200) {
                const response = JSON.parse(data.value);
                const comm = response.comment;
                const replies = response.replies;
                const commentInstance = document.getElementById('modalReplies-comment') as HTMLTemplateElement;
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
                commentCont.appendChild(commentClone);

                //if it has replies
                if (replies.length > 0) {
                    for (const reply of replies) {
                        repliesCont.appendChild(window.fillReplyTemplate(reply));
                    }
                }

                commentCont.querySelector('.mrc-replybtn')!.addEventListener('click', () => {
                    createAddReplyField(commentCont);
                });
                repliesCont.querySelectorAll('.mrr-replybtn').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const target = btn.closest('.mr-reply')!.getAttribute('data-username');
                        createAddReplyField(repliesCont, target);
                    });
                });
            }
        })
        .then(() => {
            if (!isNaN(gotoReplyId)) {
                repliesModal.querySelector('.mr-reply[data-replyid="' + gotoReplyId + '"]')?.scrollIntoView();
            }
            else if (replyToComment === true) {
                createAddReplyField(commentCont);
            }
        })
        .catch(error => {
            console.log('Fetching reply method is at fault', error)
        });
}

function fillCommentTemplate(comment: ofComment_1, page: string | null) {
    const instance = document.getElementById('comment_instance') as HTMLTemplateElement;
    const clone = window.cloneFromTemplate(instance);
    //Check if user voted this parent
    window.checkVoted_icons(clone, comment.votedByUser);

    //Populate comment
    clone.querySelector('.comment')!.setAttribute('data-commentid', comment.id.toString());
    //NULL CHECK FOR ACCOUNT WILL BE CODED
    clone.querySelector('.c-header > img')!.setAttribute('src', '/images/users/' + comment.account!.profilePic);
    clone.querySelector('.c-username')!.textContent = comment.account!.displayName !== null
        ? comment.account!.displayName
        : comment.account!.username;
    clone.querySelector('.c-date')!.textContent = window.TimeAgo(comment.publishDate);
    //body
    const commentBody = clone.querySelector('.c-text > span') as HTMLSpanElement;
    const refinedText = window.sanitizingUserInput(comment.body);
    if (refinedText.userRef) {
        commentBody.appendChild(refinedText.userRef);
    }
    commentBody.append(refinedText.text);


    if (comment.voteResult >= 0) {
        clone.querySelector('.c-likes')!.textContent = comment.voteResult.toString();
    }

    //Replies
    const cGetRepliesBtn = clone.querySelector('.get_replies') as HTMLDivElement;
    if (comment.repliesLength === 0) {
        cGetRepliesBtn.style.display = "none";
    }
    else {
        let repliesBtnText = " replies";
        if (comment.repliesLength === 1) {
            repliesBtnText = " reply";
        }
        cGetRepliesBtn.textContent = comment.repliesLength + repliesBtnText;
    }
    cGetRepliesBtn.addEventListener('click', () => window.openRepliesModal(comment.id.toString()));
    //Get and populate highlighted reply
    const hreply = comment.highlightedReply; //await fetchHighlightedReply(comment.id.toString()) as ofReply_1 | null;
    if (hreply) {
        //Check if user voted this parent
        const rContainer = clone.querySelector('.reply') as HTMLDivElement;
        window.checkVoted_icons(rContainer, hreply.votedByUser);
        rContainer.setAttribute('data-replyid', hreply.id.toString());

        const hreplyBody = clone.querySelector('.r-text > span') as HTMLSpanElement;
        const refinedText = window.sanitizingUserInput(hreply.body);
        if (refinedText.userRef) {
            hreplyBody.appendChild(refinedText.userRef);
        }
        hreplyBody.append(refinedText.text);

        if (hreply.voteResult >= 0) {
            clone.querySelector('.r-likes')!.textContent = hreply.voteResult.toString();
        }
        //NULL CHECK FOR ACCOUNT WILL BE CODED
        clone.querySelector('.r-user > img')!.setAttribute('src', '/images/users/' + hreply.account!.profilePic);
        clone.querySelector('.r-username')!.textContent = hreply.account!.displayName != null
            ? hreply.account!.displayName
            : hreply.account!.username;

        clone.querySelector('.r-gotoreply')!.addEventListener('click', () =>
            window.openRepliesModal(comment.id.toString(), { gotoReplyId: hreply.id.toString() }));
    }
    else {
        clone.querySelector('.reply')!.remove();
    }
    //If this is profile page, show "link to post"
    const cReplyBtn = clone.querySelector('.c-replybtn') as HTMLAnchorElement;
    if (page === "profile") {
        cReplyBtn.remove();
        let linkToPost = document.createElement('a');
        linkToPost.href = "/p/" + comment.targetPostId + "?cid=" + comment.id; //targetPostId can be empty normally but reviews are only post comments so there is no chance of fail
        linkToPost.textContent = "Post";
        clone.querySelector('.c-evaluation')!.appendChild(linkToPost);
    }
    else {
        cReplyBtn.addEventListener('click', () =>
            window.openRepliesModal(comment.id.toString(), { replyToComment: true }));
    }

    return clone;
}
function fillHighlightedReply(hreply: any) {

}
function fillReplyTemplate(reply: any) {
    const instance = document.getElementById('modalReplies-reply') as HTMLTemplateElement;
    const clone = window.cloneFromTemplate(instance);
    window.checkVoted_icons(clone, reply.votedByUser);

    clone.querySelector('.mr-reply')!.setAttribute('data-replyid', reply.id);
    clone.querySelector('.mr-reply')!.setAttribute('data-username', reply.account.username);
    clone.querySelector('.mrr-header > img')!.setAttribute('src', '/images/users/' + reply.account.profilePic);
    if (reply.account.displayName != null) {
        clone.querySelector('.mrr-username')!.textContent = reply.account.displayName;
    } else {
        clone.querySelector('.mrr-username')!.textContent = reply.account.username;
    }
    clone.querySelector('.mrr-date')!.textContent = window.TimeAgo(reply.publishDate);
    if (reply.voteResult >= 0) {
        clone.querySelector('.mrr-likes')!.textContent = reply.voteResult;
    }
    //Check reply text
    const replyBody = clone.querySelector('.mrr-text > span') as HTMLSpanElement;
    const refinedText = window.sanitizingUserInput(reply.body);
    if (refinedText.userRef) {
        replyBody.appendChild(refinedText.userRef);
    }
    replyBody.append(refinedText.text);
    return clone;
}
//--------COMMENT SECTION ENDS-------



//-----------VOTE MANAGEMENT-------------
function VoteRequest(btn: HTMLElement, data: any) {
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
            } else {
                console.log("Vote error status -> " + data.statusCode);
            }
        })
        .catch(error => console.log('Vote function failed.', error));
}


function voting_visual(btn: HTMLElement, action: string) {
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
        const val = action === "like" ? 1 : -1;
        bvInputVal += btn.classList.contains('active') ? -val : btnSibling.classList.contains('active') ? 2 * val : val;
        showVoteCount.textContent = bvInputVal.toString();
        /* Old one (same result but long code)
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
        }*/
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

function checkVoted_icons(parent: HTMLElement, val: boolean | null) {
    const likebtn = parent.querySelector('[data-action="like"]') as HTMLElement;
    const dislikebtn = parent.querySelector('[data-action="dislike"]') as HTMLElement;
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
//---------------------------------


//google auth
function googleHandleCredentialResponse(response: any) {
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

function createSkeletons(page: string) {
    const postSkelTemplate = document.getElementById("postSkeleton") as HTMLTemplateElement;
    const commentSkelTemplate = document.getElementById("commentSkeleton") as HTMLTemplateElement;

    switch (page) {
        case "index-topposts":
            //Creates top post skeletons for index page
            const index_todays = document.querySelector('.todaytop_body') as HTMLDivElement;
            const index_months = document.querySelector('.monthtop_body') as HTMLDivElement;
            for (let i = 0; i < 4; i++) {
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
                post_commentsection.appendChild(window.cloneFromTemplate(commentSkelTemplate));
            }
            break;
        case "profile-posts":
        case "profile-saved":
            //Creates post skeletons for the user posts or saved posts in profile
            const profilebody_forpost = document.getElementById(page) as HTMLDivElement;
            for (let i = 0; i < 10; i++) {
                profilebody_forpost.appendChild(window.cloneFromTemplate(postSkelTemplate));
            }
            break;
        case "profile-reviews":
            //Creates review(comment to posts) skeletons in profile
            const profilebody_forreviews = document.getElementById(page) as HTMLDivElement;
            for (let i = 0; i < 10; i++) {
                profilebody_forreviews.appendChild(window.cloneFromTemplate(commentSkelTemplate));
            }
            break;
        default:
            break;
    }
}

function fillPostTemplate(post: ofPost_1, defaultCoverVisibility: boolean = true) {
    const instance = document.getElementById('postList-post') as HTMLTemplateElement;
    const clone = window.cloneFromTemplate(instance);

    //Check if user voted this parent
    window.checkVoted_icons(clone, post.votedByUser!);
    //Main elements
    const container = clone.querySelector('.post') as HTMLDivElement;
    const title = clone.querySelector('.p-title > a') as HTMLAnchorElement;
    const publishDate = clone.querySelector('.p-date') as HTMLSpanElement;
    const coverImg = clone.querySelector('.p-cover > img') as HTMLImageElement;
    const showCoverBtn = clone.querySelector('.p-cover > span') as HTMLSpanElement;
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







//UTILITY
function sanitizingUserInput(input: string): { text: string, userRef: HTMLAnchorElement | null } {
    let { text, userRef }: any = {};
    input = input.replace(/&nbsp;/g, ' ');
    const userReference = input.match(/<a href=['"](.*?)['"] class=['"]reply_target['"]>(.*?)<\/a>/g);
    if (userReference) {
        const linkraw = userReference[0];
        input = input.replace(linkraw, '');
        const targetA = document.createElement('a');
        targetA.href = linkraw.match(/href="([^"]*)/)![1];
        targetA.classList.add('reply_target');
        targetA.textContent = linkraw.match(/reply_target">([^<]*)/)![1];
        userRef = targetA;
    }
    text = input;
    return { text, userRef };
}
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
