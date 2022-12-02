
$(document).ready(function () {
    let profileTabLinks = document.querySelectorAll('.profile-tabs a');

    const pPath = "/u/" + getPathPart(2) + "/";
    let pTab = "stats";

    profileTabLinks.forEach(function (a) {
        a.addEventListener("click", function () {
            pTab = a.getAttribute('data-tab');
            window.history.pushState(null, null, pPath+pTab);
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
        document.querySelector('.profile-tabs a[data-tab="' + tab + '"]').classList.add('active');

        //Filling the tabs
        switch (tab) {
            case "posts":
                break;
            case "comments":
                break;
            case "saved":
                break;
            case "liked":
                break;
            case "friends":
                break;
            default:
                //stats
                break;
        }
    }
});