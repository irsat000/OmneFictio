"use strict";
document.addEventListener("DOMContentLoaded", function () {
    let profileTabLinks = document.querySelectorAll('.profile-tabs-cont a');
    const targetUsername = getPathPart(2);
    const pPath = "/u/" + targetUsername + "/";
    const getTab = getPathPart(3);
    let pTab = getTab === "" ? "posts" : getTab;
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
                const response = JSON.parse(data.value);
                console.log(response.accountInfo);
            }
            else if (data.statusCode === 404) {
            }
            else {
            }
        })
            .catch(error => {
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
