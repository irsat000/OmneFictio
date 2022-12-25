"use strict";
class ofAccount_I {
    id;
    username;
    displayName;
    profilePic;
    selfDesc;
    deletedStatus;
    authorities;
    stat_reputation;
    stat_follows;
    stat_giftsReceived;
    stat_likes;
    stat_saved;
    stat_postsPublished;
    isNSFW;
    ownProfile;
    email;
    emailValid;
    gold;
}
document.addEventListener("DOMContentLoaded", function () {
    let profileTabLinks = document.querySelectorAll('.profile-tabs-cont a');
    const targetUsername = getPathPart(2);
    const pPath = "/u/" + targetUsername + "/";
    const getTab = getPathPart(3);
    let pTab = getTab === "" ? "posts" : getTab;
    const profileInfoCont = document.querySelector('.profile_details-cont');
    const profileBody = document.getElementById('profile-body');
    const profileBody_posts = document.getElementById('profile-posts');
    const profileBody_reviews = document.getElementById('profile-reviews');
    const profileBody_saved = document.getElementById('profile-saved');
    const profileBody_followed = document.getElementById('profile-followed');
    const profileBody_friends = document.getElementById('profile-friends');
    let loadedOnce_posts = 0;
    let loadedOnce_reviews = 0;
    let loadedOnce_saved = 0;
    let loadedOnce_followed = 0;
    let loadedOnce_friends = 0;
    profileTabLinks.forEach(function (a) {
        a.addEventListener("click", function () {
            pTab = a.getAttribute('data-tab');
            window.history.pushState(null, "", pPath + pTab);
            changeProfileTab(pTab);
        });
    });
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
            .then(async (data) => {
            if (data.statusCode === 200) {
                const Info = JSON.parse(data.value).accountInfo;
                const instance = document.getElementById('profileInfoInstance');
                const clone = window.cloneFromTemplate(instance);
                const userImg = clone.querySelector('.pr-img_cont > img');
                const username = clone.querySelector('.pr-username');
                const displayName = clone.querySelector('.pr-displayname');
                const bio = clone.querySelector('.pr-bio');
                if (Info.profilePic !== null) {
                    userImg.src = '/images/users/' + Info.profilePic;
                }
                else {
                    userImg.src = '/images/users/not_available.png';
                }
                if (Info.displayName === null) {
                    displayName.textContent = Info.username;
                    username.remove();
                }
                else {
                    username.textContent = '(' + Info.username + ')';
                    displayName.textContent = Info.displayName;
                }
                if (Info.selfDesc !== null) {
                    bio.textContent = Info.selfDesc;
                }
                else {
                    bio.textContent = "There is no bio :(";
                }
                clone.querySelector('.stat-reputation').textContent = Info.stat_reputation;
                clone.querySelector('.stat-follow').textContent = Info.stat_follows;
                clone.querySelector('.stat-gifts').textContent = Info.stat_giftsReceived;
                clone.querySelector('.stat-likes').textContent = Info.stat_likes;
                clone.querySelector('.stat-saved').textContent = Info.stat_saved;
                clone.querySelector('.stat-posts').textContent = Info.stat_postsPublished;
                const propertiesCont = clone.querySelector('.pr-properties');
                if (Info.isNSFW === true) {
                    propertiesCont.innerHTML += `<span class="pr-nsfw_warning">NSFW <i class="bi bi-exclamation-circle"></i></span>`;
                }
                if (Info.authorities.find(a => a.code === "DEV")) {
                    propertiesCont.innerHTML += '<span class="pr-developer">Developer <i class="bi bi-gear"></i></span>';
                }
                if (Info.authorities.find(a => a.code === "ADMIN")) {
                    propertiesCont.innerHTML += '<span class="pr-officer">Admin <i class="bi bi-shield"></i></span>';
                }
                if (Info.authorities.find(a => a.code === "MOD")) {
                    propertiesCont.innerHTML += '<span class="pr-officer">Moderator <i class="bi bi-shield"></i></span>';
                }
                const verifyEmailLink = clone.querySelector('.pr-verifyemail');
                const gold = clone.querySelector('.pr-gold');
                if (Info.ownProfile === true) {
                    clone.querySelector('.pr-email').textContent = Info.email;
                    if (Info.emailValid === true) {
                        verifyEmailLink.remove();
                    }
                    gold.textContent = Info.gold.toString();
                    gold.innerHTML += '<i class="bi bi-coin"></i>';
                }
                else {
                    clone.querySelector('.pr-email_cont').remove();
                    gold.remove();
                }
                profileInfoCont.innerHTML = "";
                profileInfoCont.appendChild(clone);
            }
            else if (data.statusCode === 404) {
                profileInfoCont.innerHTML = "USER COULDN'T BE FOUND";
            }
            else {
                profileInfoCont.innerHTML = "AND ERROUR OCCURRED";
            }
        })
            .catch(error => {
            profileInfoCont.innerHTML = "AND ERROUR OCCURRED";
            console.log('Profile info fetch failed -> ' + error);
        });
    }
    changeProfileTab(pTab);
    function changeProfileTab(tab) {
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
        document.querySelector('.profile-tabs-mobile a[data-tab="' + tab + '"]').classList.add('active');
        document.querySelector('.profile-tabs-desktop a[data-tab="' + tab + '"]').classList.add('active');
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
    function createProfileBody_posts() {
        fetch("/u/GetPosts/" + targetUsername, {
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
                const response = JSON.parse(data.value);
                for (const post of response.posts) {
                    const clone = window.fillPostTemplate(post);
                    profileBody_posts.appendChild(clone);
                }
                loadedOnce_posts = 1;
            }
            else if (data.statusCode === 404) {
                loadedOnce_posts = 1;
            }
            else {
                console.log();
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
            .then(async (data) => {
            profileBody_reviews.innerHTML = "";
            if (data.statusCode === 200) {
                for (const comment of JSON.parse(data.value)) {
                    profileBody_reviews.appendChild(await fillCommentTemplate(comment, "profile"));
                }
                ;
                loadedOnce_reviews = 1;
            }
            else if (data.statusCode === 404) {
                loadedOnce_reviews = 1;
            }
            else {
            }
        })
            .catch(error => {
            console.log('Fetch failed -> ' + error);
        });
    }
});
