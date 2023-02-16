"use strict";
document.addEventListener("DOMContentLoaded", function () {
    const navmobile = document.querySelector('.mobile_nav');
    const navdesktop = document.querySelector('.desktop_nav');
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
        fetch("/u/GetAccountInformation", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((data) => {
            const account = JSON.parse(data.value);
            console.log(account);
        });
    }
    function createBody_settings() {
    }
    function createBody_customize() {
    }
});
