
$(document).ready(function () {
    let profileTabLinks = document.querySelectorAll('.profile-tabs-cont a');

    const pPath = "/u/" + getPathPart(2) + "/";
    const getTab = getPathPart(3);
    let pTab = getTab === "" ? "posts" : getTab;

    profileTabLinks.forEach(function (a) {
        a.addEventListener("click", function () {
            pTab = a.getAttribute('data-tab');
            window.history.pushState(null, null, pPath + pTab);
            changeProfileTab(pTab);
        });
    });

    changeProfileTab(pTab);
    function changeProfileTab(tab) {
        //Deactivates all tabs
        profileTabLinks.forEach(function (a) {
            if (a.classList.contains("active")) {
                a.classList.remove("active");
            }
        });
        //Activating new tab (Button only)
        document.querySelector('.profile-tabs-mobile a[data-tab="' + tab + '"]').classList.add('active');
        document.querySelector('.profile-tabs-desktop a[data-tab="' + tab + '"]').classList.add('active');
        //Filling the tabs
        switch (tab) {
            case "posts":
                break;
            case "comments":
                break;
            case "saved":
                break;
            case "followed":
                break;
            case "friends":
                break;
            default:
                break;
        }
    }

    
    $(window).resize(function () {
        /*if ($(window).width() > 991) {
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

        }*/
    });
});
