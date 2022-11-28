
$(document).ready(function () {
    const navmobile = document.querySelector('.mobile_nav');
    const navdesktop = document.querySelector('.desktop_nav');
    const aboutyouTabs = document.querySelectorAll('.s-about_you .ay-tabs a');

    let library_currentSubTab = "favorites";
    let mystuff_currentSubTab = "myposts";

    //Opening the given tab for the first time when entering the page
    let firstTimeEntering = 1;
    let settingsTab = window.location.pathname;
    changeSettingsTab(settingsTab);

    //All tab buttons
    let settingTabLinks = Array.from(navmobile.children);
    aboutyouTabs.forEach(function (a) {
        settingTabLinks.push(a);
    });
    Array.from(navdesktop.children).forEach(function (li) {
        settingTabLinks.push(li.firstChild);
    });

    //----Buttons to create links----
    settingTabLinks.forEach(function (a) {
        a.addEventListener("click", function () {
            settingsTab = a.getAttribute('data-href');
            window.history.pushState(null, null, settingsTab);
            firstTimeEntering = 0;
            changeSettingsTab(settingsTab);
        });
    });
    //----------

    function changeSettingsTab(tab) {
        //Removes active if one of them already has it 
        //(if it's not the first time entering the page)
        if (firstTimeEntering === 0) {
            settingTabLinks.forEach(function (a) {
                if (a.classList.contains("active")) {
                    a.classList.remove("active");
                }
            });
        }

        //switching between tabs
        if (tab === "/settings/library" ||
            tab === "/settings/mystuff" ||
            tab === "/settings/history") {
            navmobile.querySelector('[data-href="/settings/library"]').classList.add('active');
            navdesktop.querySelector('[data-href="/settings/library"]').classList.add('active');
            //Deactivating tabs and activating relevant one in about you tab
            aboutyouTabs.forEach(function (a) {
                if (a.classList.contains("active")) {
                    a.classList.remove("active");
                }
                if (a.getAttribute('data-href') === tab) {
                    a.classList.add('active');
                }
            });
            //document.querySelector('.s-about_you [data-href="'+tab+'"]').classList.add('active');
        } else {
            navmobile.querySelector('[data-href="' + tab + '"]').classList.add('active');
            navdesktop.querySelector('[data-href="' + tab + '"]').classList.add('active');
        }

        //Filling the tabs
        switch (tab) {
            case "/settings/library":
                document.querySelector('.s-about_you .l-subtabs').style.display = "flex";
                document.querySelector('.s-about_you .ms-subtabs').style.display = "none";
                if (library_currentSubTab === "favorites") {
                    createSBody_favorites();
                } else {
                    createSBody_liked();
                }
                break;
            case "/settings/mystuff":
                document.querySelector('.s-about_you .ms-subtabs').style.display = "flex";
                document.querySelector('.s-about_you .l-subtabs').style.display = "none";
                if (mystuff_currentSubTab === "myposts") {
                    createSBody_myposts();
                } else {
                    createSBody_mycomments();
                }
                break;
            case "/settings/history":
                document.querySelector('.s-about_you .ms-subtabs').style.display = "none";
                document.querySelector('.s-about_you .l-subtabs').style.display = "none";
                break;
            case "/settings/profile":
                break;
            case "/settings/friends":
                break;
            case "/settings":
                break;
            case "/settings/customize":
                break;
            default:
                break;
        }
    } //changeSettingsTab END

    //About you - sub tab actions
    document.querySelectorAll('.s-about_you .ay-subtabs a').forEach(function (a) {
        a.addEventListener("click", function () {
            const subpage = a.getAttribute('data-subtab');
            if (subpage === "favorites") {
                createSBody_favorites();
            }
            else if (subpage === "liked") {
                createSBody_liked();
            }
            else if (subpage === "myposts") {
                createSBody_myposts();
            }
            else if (subpage === "mycomments") {
                createSBody_mycomments();
            }
        });
    });


    //-----Creating pages for settings-----

    function createSBody_favorites() {
        document.querySelector('.s-about_you a[data-subtab="favorites"]').classList.add('active');
        document.querySelector('.s-about_you a[data-subtab="liked"]').classList.remove('active');
        library_currentSubTab = "favorites";
        //alert("favs");
    }
    function createSBody_liked() {
        document.querySelector('.s-about_you a[data-subtab="liked"]').classList.add('active');
        document.querySelector('.s-about_you a[data-subtab="favorites"]').classList.remove('active');
        library_currentSubTab = "liked";
        //alert("liked");
    }
    function createSBody_myposts() {
        document.querySelector('.s-about_you a[data-subtab="myposts"]').classList.add('active');
        document.querySelector('.s-about_you a[data-subtab="mycomments"]').classList.remove('active');
        mystuff_currentSubTab = "myposts";
        //alert("posts");
    }
    function createSBody_mycomments() {
        document.querySelector('.s-about_you a[data-subtab="mycomments"]').classList.add('active');
        document.querySelector('.s-about_you a[data-subtab="myposts"]').classList.remove('active');
        mystuff_currentSubTab = "mycomments";
        //alert("comments");
    }

});