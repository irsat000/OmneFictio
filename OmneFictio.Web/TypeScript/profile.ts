
class ofAccount_I {
    id!: number;
    username!: string;
    displayName!: string | null;
    profilePic!: string | null;
    selfDesc!: string | null;
    deletedStatus!: JustBody | null;
    authorities!: Authority[];

    stat_reputation!: string;
    stat_follows!: string;
    stat_giftsReceived!: string;
    stat_likes!: string;
    stat_saved!: string;
    stat_postsPublished!: string;

    isNSFW!: boolean;
    ownProfile!: boolean;
    email!: string | null;
    emailValid!: boolean | null;
    gold!: number | null;
}
document.addEventListener("DOMContentLoaded", function () {
    let profileTabLinks = document.querySelectorAll
        ('.profile-tabs-mobile a[data-tab], .profile-tabs-desktop a[data-tab]') as NodeListOf<HTMLAnchorElement>;
    const targetUsername: string = getPathPart(2);
    const pPath: string = "/u/" + targetUsername + "/";
    const getTab: string = getPathPart(3);
    let pTab: string = getTab === "" ? "posts" : getTab;

    const profileInfoCont = document.querySelector('.profile_details-cont') as HTMLDivElement;
    const profileBody = document.getElementById('profile-body') as HTMLDivElement;
    const profileBody_posts = document.getElementById('profile-posts') as HTMLDivElement;
    const profileBody_reviews = document.getElementById('profile-reviews') as HTMLDivElement;
    const profileBody_saved = document.getElementById('profile-saved') as HTMLDivElement;
    const profileBody_followed = document.getElementById('profile-followed') as HTMLDivElement;
    const profileBody_friends = document.getElementById('profile-friends') as HTMLDivElement;
    let loadedOnce_posts: number = 0;
    let loadedOnce_reviews: number = 0;
    let loadedOnce_saved: number = 0;
    let loadedOnce_followed: number = 0;
    let loadedOnce_friends: number = 0;

    getProfileInfo();
    function getProfileInfo() {
        fetch("/u/GetUserInfo/" + targetUsername, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.statusCode === 200) {
                    //GET THE POSTS
                    const Info = JSON.parse(data.value).accountInfo as ofAccount_I;
                    const instance = document.getElementById('profileInfoInstance') as HTMLTemplateElement;
                    const clone = window.cloneFromTemplate(instance);

                    //primary info
                    const userImg = clone.querySelector('.pr-img_cont > img') as HTMLImageElement;
                    const username = clone.querySelector('.pr-username') as HTMLSpanElement;
                    const displayName = clone.querySelector('.pr-displayname') as HTMLSpanElement;
                    const bio = clone.querySelector('.pr-bio') as HTMLSpanElement;

                    if (Info.profilePic !== null) {
                        userImg.src = '/images/users/' + Info.profilePic;
                    } else {
                        userImg.src = '/images/users/not_available.png';
                    }
                    if (Info.displayName === null) {
                        displayName.textContent = Info.username;
                        username.remove();
                    } else {
                        username.textContent = '(' + Info.username + ')';
                        displayName.textContent = Info.displayName;
                    }
                    if (Info.selfDesc !== null) {
                        bio.textContent = Info.selfDesc;
                    } else {
                        bio.textContent = "There is no bio :(";
                    }

                    //stats
                    clone.querySelector('.stat-reputation')!.textContent = Info.stat_reputation;
                    clone.querySelector('.stat-follow')!.textContent = Info.stat_follows;
                    clone.querySelector('.stat-gifts')!.textContent = Info.stat_giftsReceived;
                    clone.querySelector('.stat-likes')!.textContent = Info.stat_likes;
                    clone.querySelector('.stat-saved')!.textContent = Info.stat_saved;
                    clone.querySelector('.stat-posts')!.textContent = Info.stat_postsPublished;

                    //Properties
                    const propertiesCont = clone.querySelector('.pr-properties') as HTMLDivElement;
                    if (Info.isNSFW === true) {
                        propertiesCont.innerHTML += `<span class="pr-nsfw_warning">NSFW <i class="bi bi-exclamation-circle"></i></span>`;
                    }
                    if (Info.authorities.find(a => a.code === "DEV")) {
                        propertiesCont.innerHTML += '<span class="pr-developer">Developer <i class="bi bi-tools"></i></span>';
                    }
                    if (Info.authorities.find(a => a.code === "ADMIN")) {
                        propertiesCont.innerHTML += '<span class="pr-officer">Admin <i class="bi bi-shield"></i></span>';
                    }
                    if (Info.authorities.find(a => a.code === "MOD")) {
                        propertiesCont.innerHTML += '<span class="pr-officer">Moderator <i class="bi bi-shield"></i></span>';
                    }

                    const verifyEmailLink = clone.querySelector('.pr-verifyemail') as HTMLAnchorElement;
                    const gold = clone.querySelector('.pr-gold') as HTMLSpanElement;
                    //profile owner only
                    if (Info.ownProfile === true) {
                        clone.querySelector('.pr-email')!.textContent = Info.email;
                        if (Info.emailValid === true) {
                            verifyEmailLink.remove();
                            //Will send verification link to email
                        }
                        gold.textContent = Info.gold!.toString();
                        gold.innerHTML += '<i class="bi bi-coin"></i>';
                    } else {
                        clone.querySelector('.pr-email_cont')!.remove();
                        gold.remove();
                    }
                    profileInfoCont.innerHTML = "";
                    profileInfoCont.appendChild(clone);
                } else if (data.statusCode === 404) {
                    profileInfoCont.innerHTML = "USER COULDN'T BE FOUND";
                } else {
                    profileInfoCont.innerHTML = "AND ERROUR OCCURRED";
                }
            })
            .catch(error => {
                profileInfoCont.innerHTML = "AND ERROUR OCCURRED";
                console.log('Profile info fetch failed -> ' + error);
            });
    }





    profileTabLinks.forEach(function (a) {
        a.addEventListener("click", function () {
            pTab = a.getAttribute('data-tab')!;
            window.history.pushState(null, "", pPath + pTab);
            changeProfileTab(pTab);
        });
    });

    document.getElementById('refresh_ptab')!.addEventListener('click', () => {
        switch (pTab) {
            case "posts": loadedOnce_posts = 0; break;
            case "reviews": loadedOnce_reviews = 0; break;
            case "saved": loadedOnce_saved = 0; break;
            case "followed": loadedOnce_followed = 0; break;
            case "friends": loadedOnce_friends = 0; break;
            default: return;
        }
        changeProfileTab(pTab);
    });

    changeProfileTab(pTab);
    function changeProfileTab(tab: string) {
        //Deactivates all tabs
        profileTabLinks.forEach(a => a.classList.remove("active"));
        [...profileBody.children].forEach(b => b.classList.remove("active"));
        //Activating new tab (Button only)
        document.querySelector('.profile-tabs-mobile a[data-tab="' + tab + '"]')!.classList.add('active');
        document.querySelector('.profile-tabs-desktop a[data-tab="' + tab + '"]')!.classList.add('active');
        //Filling the tabs
        switch (tab) {
            case "posts":
                profileBody_posts.classList.add("active");
                if (loadedOnce_posts !== 1) {
                    profileBody_posts.innerHTML = "";
                    window.createSkeletons("profile-posts");
                    createProfileBody_posts();
                }
                break;
            case "reviews":
                profileBody_reviews.classList.add("active");
                if (loadedOnce_reviews !== 1) {
                    profileBody_reviews.innerHTML = "";
                    window.createSkeletons("profile-reviews");
                    createProfileBody_reviews();
                }
                break;
            case "saved":
                profileBody_saved.classList.add("active");
                if (loadedOnce_saved !== 1) {
                    profileBody_saved.innerHTML = "";
                    window.createSkeletons("profile-saved");
                    createProfileBody_saved();
                }
                break;
            case "followed":
                profileBody_followed.classList.add("active");
                break;
            case "friends":
                profileBody_friends.classList.add("active");
                break;
            default:
                break;
        }
    }





    function createProfileBody_posts() {
        fetch("/u/GetPosts/" + targetUsername, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((data) => {
                profileBody_posts.innerHTML = "";
                if (data.statusCode === 200) {
                    //GET THE POSTS
                    const response = JSON.parse(data.value);
                    for (const post of response.posts) {
                        profileBody_posts.appendChild(window.fillPostTemplate(post));
                    }
                    loadedOnce_posts = 1;
                } else if (data.statusCode === 404) {
                    loadedOnce_posts = 1;
                } else {
                }
            })
            .catch(error => {
                profileBody_posts.innerHTML = "Fetch fail";
                console.log('Profile post fetch failed -> ' + error);
            });
    }

    function createProfileBody_reviews() {
        fetch("/u/GetReviews/" + targetUsername, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((data) => {
                profileBody_reviews.innerHTML = "";
                if (data.statusCode === 200) {
                    //GET THE COMMENTS
                    for (const comment of JSON.parse(data.value)) {
                        profileBody_reviews.appendChild(fillCommentTemplate(comment, "profile"));
                    };
                    loadedOnce_reviews = 1;
                } else if (data.statusCode === 404) {
                    loadedOnce_reviews = 1;
                } else {

                }
            })
            .catch(error => {
                console.log('Fetch failed -> ' + error);
            });
    }

    function createProfileBody_saved() {
        fetch("/u/GetSavedPosts/" + targetUsername, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((data) => {
                profileBody_saved.innerHTML = "";
                if (data.statusCode === 200) {
                    //GET THE POSTS
                    const response = JSON.parse(data.value);
                    for (const post of response.posts) {
                        profileBody_saved.appendChild(window.fillPostTemplate(post));
                    }
                    loadedOnce_saved = 1;
                } else if (data.statusCode === 404) {
                    loadedOnce_saved = 1;
                } else {
                }
            })
            .catch(error => {
                profileBody_saved.innerHTML = "Fetch fail";
                console.log('Profile post fetch failed -> ' + error);
            });
    }







    /*$(window).resize(function () {
        if ($(window).width() > 991) {
            //check if user clicked stats in mobile design and got back to desktop
            //(desktop doesn't have stats button, stats are on the left)
            const a = document.querySelector('.profile-tabs-mobile a[data-tab="stats"]');
            if (a.classList.contains("active")) {
                a.classList.remove("active");
                document.querySelector('.profile-tabs-mobile a[data-tab="posts"]').classList.add('active');
                document.querySelector('.profile-tabs-desktop a[data-tab="posts"]').classList.add('active');
                changeProfileTab("posts");
            }
        }
        else {

        }
    });*/
});
