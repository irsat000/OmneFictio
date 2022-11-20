
$(document).ready(function () {
    const navmobile = document.querySelector('.mobile_nav');
    const navdesktop = document.querySelector('.desktop_nav');
    let firstTimeEntering = 1;
    let settingsTab = window.location.pathname;

    let settingTabLinks = Array.from(navmobile.children);
    Array.from(navdesktop.children).forEach(function (li) {
        settingTabLinks.push(li.firstChild);
    });
    settingTabLinks.forEach(function (a) {
        a.addEventListener("click", function () {
            settingsTab = a.getAttribute('data-href');
            window.history.pushState(null, null, settingsTab);
            firstTimeEntering = 0;
            changeSettingsTab(settingsTab);
        });
    });

    changeSettingsTab(settingsTab);
    function changeSettingsTab(tab) {
        if(firstTimeEntering === 0){
            settingTabLinks.forEach(function (a) {
                if (a.classList.contains("active")) {
                    a.classList.remove("active");
                }
            });
        }
        switch (tab) {
            case "/settings/profile":
                navmobile.getElementsByTagName('a')[0].classList.add('active');
                navdesktop.getElementsByTagName('a')[0].classList.add('active');
                break;
            case "/settings/library":
            case "/settings/mystuff":
            case "/settings/history":
                navmobile.getElementsByTagName('a')[1].classList.add('active');
                navdesktop.getElementsByTagName('a')[1].classList.add('active');
                break;
            case "/settings/friends":
                navmobile.getElementsByTagName('a')[2].classList.add('active');
                navdesktop.getElementsByTagName('a')[2].classList.add('active');
                break;
            case "/settings":
                navmobile.getElementsByTagName('a')[3].classList.add('active');
                navdesktop.getElementsByTagName('a')[3].classList.add('active');
                break;
            case "/settings/customize":
                navmobile.getElementsByTagName('a')[4].classList.add('active');
                navdesktop.getElementsByTagName('a')[4].classList.add('active');
                break;
            default:
                break;
        }
    }

});