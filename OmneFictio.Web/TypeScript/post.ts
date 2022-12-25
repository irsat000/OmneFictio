

document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const modalbg1 = document.querySelector('.modalbg1') as HTMLDivElement;
    const commentSection = document.getElementById('comment-section') as HTMLDivElement;
    const rateByUser = document.getElementById('rate_by_user') as HTMLSpanElement;
    const chaptersModal = document.getElementById('modal-chapters') as HTMLDivElement;
    const fullsizecover = document.getElementById('fullsize-cover') as HTMLDivElement;
    const previousPageBtn = document.getElementById('goBackToReadPage') as HTMLAnchorElement;

    modalbg1.addEventListener("click", function () {
        closeChaptersModal();
    });

    document.addEventListener('click', function (e) {
        const target = e.target as HTMLElement;
        if (target.id === "p-upscalecover" ||
            (target.parentElement != null &&
                target.parentElement.id === "p-upscalecover")) {
            if (!fullsizecover.classList.contains('dblock')) {
                fullsizecover.classList.add('dblock')
            }
        }
        if (target.closest('c-menupopup') === null
            && !target.closest('.c-menu')
            && !target.classList.contains('c-menu')) {
            closeAllCommentMenus();
        }
    });

    if (params.get('lp') !== null) {
        const lastPage = params.get('lp')!;
        previousPageBtn.href = lastPage;
        params.delete('lp');

        let newUrl: string = window.location.href.split('?')[0];
        if ([...params.keys()].length > 0) {
            newUrl += "?" + params.toString();
        }

        window.sessionStorage.setItem(newUrl, lastPage);
        window.history.replaceState({}, document.title, newUrl);
    }
    else if (sessionStorage.getItem(window.location.href) !== null) {
        previousPageBtn.href = sessionStorage.getItem(window.location.href)!;
    }
    else {
        previousPageBtn.remove();
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
                    const instance = document.getElementById('getpost_instance') as HTMLTemplateElement;
                    const clone = window.cloneFromTemplate(instance);

                    //Check if user voted this parent
                    window.checkVoted_icons(clone, post.votedByUser);

                    clone.querySelector('.post-2')!.setAttribute('data-postid', post.id);

                    if (post.coverImage !== null) {
                        clone.querySelector('.p-basecover')!.setAttribute('src', '/images/covers/' + post.coverImage);
                        clone.querySelector('.p-upscalecover')!.setAttribute('src', '/images/covers/' + post.coverImage);
                        document.getElementById('fsc-img')!.setAttribute('src', '/images/covers/' + post.coverImage);
                    } else {
                        clone.querySelector('.p-cover')!.remove();
                    }
                    clone.querySelector('.p-title')!.textContent = post.title;
                    clone.querySelector('.p-date')!.textContent = window.TimeAgo(post.publishDate);
                    clone.querySelector('.p-description')!.textContent = post.postDescription;
                    if (post.voteResult >= 0) {
                        clone.querySelector('.vote_count')!.textContent = post.voteResult;
                    }
                    clone.querySelector('.p-rate')!.textContent = post.rateResult >= 0 && post.rateResult <= 10
                        ? post.rateResult + "/10" : "-/10";
                    //user
                    if (post.account.displayName !== null) {
                        clone.querySelector('.p-username')!.textContent = post.account.displayName;
                    } else {
                        clone.querySelector('.p-username')!.textContent = post.account.username;
                    }
                    clone.querySelector('.p-uimg-cont > img')!.setAttribute('src', '/images/users/' + post.account.profilePic);

                    clone.querySelectorAll('.pd-primary > span')[0].textContent = post.postType.body;
                    clone.querySelectorAll('.pd-primary > span')[1].textContent = post.language.body;
                    clone.querySelectorAll('.pd-primary > span')[2].textContent = post.postStatus.body;
                    clone.querySelectorAll('.pd-primary > span')[3].textContent = post.ratedAs.body;

                    //Post save button
                    const postSaveBtn = clone.querySelector('#postSaveBtn') as HTMLButtonElement;
                    if(post.savedByUser == true){
                        postSaveBtn.classList.add('pd-saved');
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
                                    postSaveBtn.classList.add('pd-saved');
                                } else if (data.statusCode === 202) {
                                    postSaveBtn.classList.remove('pd-saved');
                                } else {
                                    alert(data.statusCode);
                                }
                            })
                            .catch(error => { console.log("Fetch failed -> " + error) });
                    });

                    //get user's rate
                    if (post.ratedByUser != null) {
                        rateByUser.textContent = post.ratedByUser + "/10";
                    }

                    const tagSection = clone.querySelector('.pd-tags') as HTMLDivElement;
                    const seriesSection = clone.querySelector('.pd-series') as HTMLDivElement;
                    //tag list
                    if (post.tags.length > 0) {
                        post.tags.forEach((tagname: any) =>
                            tagSection.innerHTML += "<span>" + tagname.body + "</span>"
                        );
                    } else {
                        tagSection.innerHTML = "<span>Empty</span>";
                    }
                    //based on list
                    if (post.existingStories.length > 0) {
                        post.existingStories.forEach((storyname: any) =>
                            seriesSection.innerHTML += "<span>" + storyname.body + "</span>"
                        );
                    } else {
                        seriesSection.remove();
                    }

                    document.getElementById('post-wrap')!.appendChild(clone);
                    //get comments right after loading the post(which is important part)
                    window.createSkeletons("post-commentsection");
                    window.fetchComments("post", postId, commentSection);

                    document.getElementById('addCommentToPost')!.addEventListener('click', function () {
                        window.AddComment(JSON.stringify({
                            Body: (<HTMLTextAreaElement>document.getElementById('commentBody')).value,
                            TargetPostId: postId
                        }), commentSection);
                    });

                    //get chapter list
                    const chapterlist = document.getElementById('modalchapters-list') as HTMLUListElement;
                    chapterlist.innerHTML = "";
                    if (post.chapters.length > 0) {
                        post.chapters.sort((a: any, b: any) => a.chapterIndex - b.chapterIndex);
                        post.chapters.forEach((chapter: any) =>
                            chapterlist.innerHTML +=
                            "<li><a href='/p/" + post.id + "/" + chapter.chapterIndex + "'>" + chapter.title + "</a></li>"
                        );
                    }
                }
            })
            .catch(error => { console.log('Fetch failed -> ' + error); });;
    }

    //----Rating the post---
    const rateItBtn = document.getElementById('rate_it_btn') as HTMLButtonElement;
    rateItBtn.addEventListener('click', async function () {
        const rateVal = parseInt((<HTMLSelectElement>document.getElementById('rate_it_select')).value, 10);
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
                        if (rateVal != 0) {
                            rateByUser.textContent = rateVal + "/10";
                        } else {
                            rateByUser.textContent = "--/10";
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

    //const fsc_close = [document.getElementById('fsc-wrap'), document.getElementById('fsc-close')] as Array<HTMLElement>;
    const fsc_close = document.querySelectorAll('#fsc-wrap, #fsc-close');
    fsc_close.forEach(function (element) {
        element.addEventListener("click", function () {
            if (fullsizecover.classList.contains('dblock')) {
                fullsizecover.classList.remove('dblock')
            }
        });
    });
    //----------------------

    //open or close comment menu
    commentSection.addEventListener('click', function (e) {
        const target = e.target as HTMLElement;
        if (target.classList.contains('c-menu')
            || target.parentElement!.classList.contains('c-menu')) {
            const menu = target.closest('.comment')!.querySelector('.c-menupopup') as HTMLUListElement;
            if (menu.classList.contains('dblock')) {
                menu.classList.remove('dblock');
            } else {
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




    document.querySelectorAll('#mc-close, #get_chapters').forEach(function (element) {
        element.addEventListener("click", open_close_chapters_modal);
        element.addEventListener("touchstart", open_close_chapters_modal);
    });



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

});



