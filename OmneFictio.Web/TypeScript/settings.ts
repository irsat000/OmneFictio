
document.addEventListener("DOMContentLoaded", function () {
    const navmobile = document.querySelector('.mobile_nav') as HTMLDivElement;
    const navdesktop = document.querySelector('.desktop_nav') as HTMLDivElement;

    let settingsTab: string = window.location.pathname!;

    //Get all tab buttons
    let settingTabLinks = Array.from(navmobile.children) as Array<HTMLAnchorElement>;
    Array.from(navdesktop.children).forEach(function (li) {
        settingTabLinks.push(<HTMLAnchorElement>li.firstChild);
    });

    //----Buttons to create links----
    settingTabLinks.forEach(function (a) {
        a.addEventListener("click", function () {
            settingsTab = a.getAttribute('data-href')!;
            window.history.pushState(null, "", settingsTab);
            changeSettingsTab(settingsTab);
        });
    });
    //----------

    changeSettingsTab(settingsTab);
    function changeSettingsTab(tab: string) {
        //Deactivates all tabs
        settingTabLinks.forEach(function (a) {
            if (a.classList.contains("active")) {
                a.classList.remove("active");
            }
        });
        //Activating new tab (Button only)
        navmobile.querySelector('[data-href="' + tab + '"]')!.classList.add('active');
        navdesktop.querySelector('[data-href="' + tab + '"]')!.classList.add('active');

        //Filling the tabs
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
    } //changeSettingsTab END



    //-----Creating pages for settings-----
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
            //.catch((err) => console.log('Account info could not be fetched -> ') + err)
    }
    function createBody_settings() {

    }
    function createBody_customize() {

    }



    //-----MIGHT BE MOVED TO THE PROFILE INFO-----
    //document.querySelector('.s-library a[data-subtab="liked"]').classList.add('active');

    //Library tab actions
    /*document.querySelectorAll('.s-library .lib-tabs a').forEach(function (a) {
        a.addEventListener("click", function () {
            const libraryTab = a.getAttribute('data-libtab');
            if (libraryTab === "saved") {
                createLibraryBody_saved();
            }
            else if (libraryTab === "liked") {
                createLibraryBody_liked();
            }
            else if (libraryTab === "history") {
                createLibraryBody_history();
            }
        });
    });*/
});