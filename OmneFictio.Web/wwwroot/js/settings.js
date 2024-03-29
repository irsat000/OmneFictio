"use strict";
document.addEventListener("DOMContentLoaded", function () {
    const navmobile = document.querySelector('.mobile_nav');
    const navdesktop = document.querySelector('.desktop_nav');
    const settingsbody = document.querySelector('.settings_body');
    let settingsTab = window.location.pathname;
    let settingTabLinks = Array.from(navmobile.children);
    Array.from(navdesktop.children).forEach(function (li) {
        settingTabLinks.push(li.firstChild);
    });
    settingTabLinks.forEach(function (a) {
        a.addEventListener("click", function () {
            settingsTab = a.getAttribute('data-href');
            window.history.pushState(null, "", settingsTab);
            changeSettingsTab(settingsTab);
        });
    });
    changeSettingsTab(settingsTab);
    function changeSettingsTab(tab) {
        settingTabLinks.forEach(function (a) {
            if (a.classList.contains("active")) {
                a.classList.remove("active");
            }
        });
        navmobile.querySelector('[data-href="' + tab + '"]').classList.add('active');
        navdesktop.querySelector('[data-href="' + tab + '"]').classList.add('active');
        settingsbody.querySelectorAll(':scope > :not(.pre_load)').forEach(body => body.remove());
        switch (tab) {
            case "/settings/account":
                createBody_account();
                break;
            case "/settings":
                createBody_settings();
                break;
            case "/settings/customize":
                createBody_customize();
                break;
            default:
                break;
        }
    }
    function createBody_account() {
        settingsbody.querySelectorAll('.pre_load').forEach(body => body.classList.remove('dflex'));
        settingsbody.querySelector('.s-account_skel').classList.add('dflex');
        fetch("/u/GetAccountInformation", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((data) => {
            if (data.statusCode === 200) {
                const account = JSON.parse(data.value).account;
                console.log(account);
                const instance = document.getElementById('accountSettings_instance');
                const clone = window.cloneFromTemplate(instance);
                const username_input = clone.querySelector('input[name="as-username"]');
                const email_input = clone.querySelector('input[name="as-email"]');
                const displayName_input = clone.querySelector('input[name="as-displayname"]');
                const bio_input = clone.querySelector('textarea[name="as-bio"]');
                const profilePic_img = clone.querySelector('.as-profile_picture');
                username_input.value = account.username;
                username_input.setAttribute('data-revert', account.username);
                if (account.displayName !== null) {
                    displayName_input.value = account.displayName;
                    displayName_input.setAttribute('data-revert', account.displayName);
                }
                email_input.value = account.email;
                email_input.setAttribute('data-revert', account.email);
                if (account.emailValid) {
                    clone.querySelector('.email_confirm').remove();
                }
                if (account.selfDesc !== null) {
                    bio_input.value = account.selfDesc;
                    bio_input.setAttribute('data-revert', account.selfDesc);
                }
                if (account.profilePic !== null) {
                    profilePic_img.src = '/images/users/' + account.profilePic;
                    profilePic_img.setAttribute('data-revert', '/images/users/' + account.profilePic);
                }
                clone.querySelector('.as-savebtn').addEventListener('click', () => {
                    let profilePic = null;
                    let displayName = displayName_input.value != "" && displayName_input.value !== displayName_input.getAttribute('data-revert')
                        ? displayName_input.value
                        : null;
                    let selfDesc = bio_input.value != "" && bio_input.value !== bio_input.getAttribute('data-revert')
                        ? bio_input.value
                        : null;
                    const updateData = {
                        displayName: displayName,
                        selfDesc: selfDesc,
                        profilePic: profilePic
                    };
                    fetch('/u/UpdateAccountInformation', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(updateData)
                    })
                        .then((res) => res.json())
                        .then((data) => {
                        if (data.statusCode === 200) {
                            if (displayName !== null) {
                                displayName_input.setAttribute('data-revert', displayName);
                            }
                            if (selfDesc !== null) {
                                bio_input.setAttribute('data-revert', selfDesc);
                            }
                            console.log("Success");
                        }
                        else {
                            console.log("Fail");
                        }
                    });
                });
                settingsbody.querySelectorAll('.pre_load').forEach(body => body.classList.remove('dflex'));
                settingsbody.appendChild(clone);
            }
            else {
                alert("Login to see here!");
            }
        });
    }
    function createBody_settings() {
        settingsbody.querySelectorAll('.pre_load').forEach(body => body.classList.remove('dflex'));
        settingsbody.querySelector('.s-settings_skel').classList.add('dflex');
    }
    function createBody_customize() {
        settingsbody.querySelectorAll('.pre_load').forEach(body => body.classList.remove('dflex'));
        settingsbody.querySelector('.s-customize_skel').classList.add('dflex');
    }
});
