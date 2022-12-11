
document.addEventListener("DOMContentLoaded", function () {
    let profileTabLinks = document.querySelectorAll('.profile-tabs-cont a') as NodeListOf<HTMLAnchorElement>;
    const targetUsername:string = getPathPart(2);
    const pPath:string = "/u/" + targetUsername + "/";
    const getTab:string = getPathPart(3);
    let pTab:string = getTab === "" ? "posts" : getTab;

    const profileBody = document.getElementById('profile-body') as HTMLDivElement;
    const profileBody_posts = document.getElementById('profile-posts') as HTMLDivElement;
    const profileBody_reviews = document.getElementById('profile-reviews') as HTMLDivElement;
    const profileBody_saved = document.getElementById('profile-saved') as HTMLDivElement;
    const profileBody_followed = document.getElementById('profile-followed') as HTMLDivElement;
    const profileBody_friends = document.getElementById('profile-friends') as HTMLDivElement;
    let loadedOnce_posts:number = 0;
    let loadedOnce_reviews:number = 0;
    let loadedOnce_saved:number = 0;
    let loadedOnce_followed:number = 0;
    let loadedOnce_friends:number = 0;

    profileTabLinks.forEach(function (a) {
        a.addEventListener("click", function () {
            pTab = a.getAttribute('data-tab')!;
            window.history.pushState(null, "", pPath + pTab);
            changeProfileTab(pTab);
        });
    });

    changeProfileTab(pTab);
    function changeProfileTab(tab: string) {
        //Deactivates all tabs
        profileTabLinks.forEach(function (a) {
            if (a.classList.contains("active")) {
                a.classList.remove("active");
            }
        });
        [...profileBody.children].forEach(function (body) {
            if (body.classList.contains("active")) {
                body.classList.remove("active");
            }
        });
        //Activating new tab (Button only)
        document.querySelector('.profile-tabs-mobile a[data-tab="' + tab + '"]')!.classList.add('active');
        document.querySelector('.profile-tabs-desktop a[data-tab="' + tab + '"]')!.classList.add('active');
        //Filling the tabs
        switch (tab) {
            case "posts":
                profileBody_posts.classList.add("active");
                if (loadedOnce_posts !== 1) {
                    window.createSkeletons("profile-posts");
                    createProfileBody_posts();
                }
                break;
            case "reviews":
                profileBody_reviews.classList.add("active");
                if (loadedOnce_reviews !== 1) {
                    window.createSkeletons("profile-reviews");
                    createProfileBody_reviews();
                }
                break;
            case "saved":
                profileBody_saved.classList.add("active");
                if (loadedOnce_saved !== 1) {
                    window.createSkeletons("profile-saved");
                    loadedOnce_saved = 1;
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

    async function createProfileBody_posts() {
        await fetch("/u/GetPosts/" + targetUsername, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then(async (data) => {
                profileBody_posts.innerHTML = "";
                if (data.statusCode === 200) {
                    //GET THE POSTS
                    const response = JSON.parse(data.value);
                    for (const post of response.posts) {
                        const clone = window.fillPostTemplate(post);
                        profileBody_posts.appendChild(clone);
                    }
                    loadedOnce_posts = 1;
                } else if (data.statusCode === 404) {

                } else {
                    console.log();
                }
            })
            .catch(error => {
                profileBody_posts.innerHTML = "Fetch fail";
                console.log('Profile post fetch failed -> ' + error); //MUST NOT BE GIVEN TO USERS
            });
    }

    async function createProfileBody_reviews() {
        await fetch("/u/GetReviews/" + targetUsername, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then(async (data) => {
                profileBody_reviews.innerHTML = "";
                if (data.statusCode === 200) {
                    //GET THE COMMENTS
                    for (const comment of JSON.parse(data.value)) {
                        profileBody_reviews.appendChild(await fillCommentTemplate(comment, "profile"));
                    };
                    loadedOnce_reviews = 1;
                } else if(data.statusCode === 404){

                } else {

                }
            })
            .catch(error => {
                console.log('Fetch failed -> ' + error);
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