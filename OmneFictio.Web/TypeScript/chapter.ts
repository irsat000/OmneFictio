

document.addEventListener("DOMContentLoaded", function () {
    const commentSection = document.getElementById('comment-section') as HTMLDivElement;


    fetchChapter();
    async function fetchChapter() {
        let postid = parseInt(window.getPathPart(2), 10);
        let index = parseInt(window.getPathPart(3), 10);
        await fetch("/g/GetChapter/" + postid + "/" + index, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then(async (data) => {
                if (data.statusCode === 200) {
                    const ch = JSON.parse(data.value);
                    document.querySelector('.chapter-container')!
                        .setAttribute('data-chid', ch.id);

                    const instance = document.getElementById('chapter_instance') as HTMLTemplateElement;
                    const clone = window.cloneFromTemplate(instance);

                    //Check if user voted this parent
                    window.checkVoted_icons(clone, ch.votedByUser);

                    clone.querySelector('.ch-caption h3')!.textContent = ch.post.title;
                    clone.querySelector('.ch-caption h5')!.textContent = ch.title;
                    clone.querySelector('.ch-body')!.innerHTML = ch.body;

                    if (ch.authorNotePrior != null) {
                        clone.querySelector('.cnote_1 .authornote_body')!
                            .innerHTML = ch.authorNotePrior;
                    } else { clone.querySelector('.cnote_1')!.remove(); }

                    if (ch.authorNoteLater != null) {
                        clone.querySelector('.cnote_2 .authornote_body')!
                            .innerHTML = ch.authorNoteLater;
                    } else { clone.querySelector('.cnote_2')!.remove(); }

                    if (ch.voteResult >= 0) {
                        clone.querySelector('.vote_count')!.textContent = ch.voteResult;
                    }

                    //for navigation
                    ch.post.chapters.sort((a: any, b: any) => a.chapterIndex - b.chapterIndex);
                    //chapter indexes can be mixed. This is necessary for now.
                    const selectch = clone.querySelector('#ch-selectch') as HTMLSelectElement;
                    for (const chlistitem of ch.post.chapters) {
                        const opt = document.createElement('option');
                        opt.value = chlistitem.chapterIndex;
                        opt.innerHTML = chlistitem.title;
                        selectch.appendChild(opt);
                    }
                    selectch.value = index.toString();
                    clone.querySelector('.ch-options a')!.setAttribute('href',
                        "/p/" + postid)
                    //Navigation with select                
                    selectch.addEventListener('change', function () {
                        window.location.href = new URL(window.location.toString()).origin +
                            "/p/" + postid + "/" + this.value;
                    });
                    //Next / Prev chapter
                    let getNextHighest: number = ch.chapterIndex;
                    let getPrevHighest: number = 1;
                    for (const x of ch.post.chapters) {
                        if (x.chapterIndex > ch.chapterIndex) {
                            getNextHighest = x.chapterIndex;
                            break;
                        }
                    }
                    for (const y of ch.post.chapters) {
                        if (y.chapterIndex == ch.chapterIndex) {
                            break;
                        }
                        if (y.chapterIndex > getPrevHighest) {
                            getPrevHighest = y.chapterIndex;
                        }
                    }

                    if (getNextHighest != ch.chapterIndex) {
                        clone.querySelector('.ch-nextlink')!.setAttribute('href',
                            "/p/" + postid + "/" + getNextHighest)
                    } else {
                        clone.querySelector('.ch-nextlink')!.remove();
                    }
                    if (getPrevHighest != ch.chapterIndex) {
                        clone.querySelector('.ch-prevlink')!.setAttribute('href',
                            "/p/" + postid + "/" + getPrevHighest)
                    } else {
                        clone.querySelector('.ch-prevlink')!.remove();
                    }

                    //user
                    if (ch.post.account.displayName != null) {
                        clone.querySelector('.ch-username')!.textContent = ch.post.account.displayName;
                    } else {
                        clone.querySelector('.ch-username')!.textContent = ch.post.account.username;
                    }
                    clone.querySelector('.ch-user > img')!
                        .setAttribute('src', '/images/users/' + ch.post.account.profilePic);

                    document.querySelector('.chapter-container')!.appendChild(clone);
                    //get comments right after loading the chapter(which is important part)
                    
                    window.createSkeletons("chapter-commentsection");
                    window.fetchComments("chapter", ch.id, commentSection);

                    document.getElementById('addCommentToChapter')!.addEventListener('click', function () {
                        window.AddComment(JSON.stringify({
                            Body: (<HTMLTextAreaElement>document.getElementById('commentBody')).value,
                            TargetChapterId: ch.id
                        }), commentSection);
                    });

                } else {
                    console.log("Not 200 :( -> " + data.statusCode);
                }
            })
            .catch(error => { console.log('Fetch failed -> ' + error); });
    }



});