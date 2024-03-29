
document.addEventListener("DOMContentLoaded", function () {
    const navmobile = document.querySelector('.mobile_nav') as HTMLDivElement;
    const navdesktop = document.querySelector('.desktop_nav') as HTMLDivElement;
    const settingsbody = document.querySelector('.settings_body') as HTMLDivElement;

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
        //[...settingsbody.children].forEach(body => body.classList.contains('pre_load') ?? body.remove());
        settingsbody.querySelectorAll(':scope > :not(.pre_load)').forEach(body => body.remove());
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
        settingsbody.querySelectorAll('.pre_load').forEach(body => body.classList.remove('dflex'));
        settingsbody.querySelector('.s-account_skel')!.classList.add('dflex');
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
                    const instance = document.getElementById('accountSettings_instance') as HTMLTemplateElement;
                    const clone = window.cloneFromTemplate(instance);

                    const username_input = clone.querySelector('input[name="as-username"]') as HTMLInputElement;
                    const email_input = clone.querySelector('input[name="as-email"]') as HTMLInputElement;
                    const displayName_input = clone.querySelector('input[name="as-displayname"]') as HTMLInputElement;
                    const bio_input = clone.querySelector('textarea[name="as-bio"]') as HTMLTextAreaElement;
                    const profilePic_img = clone.querySelector('.as-profile_picture') as HTMLImageElement;

                    //Get username
                    username_input.value = account.username;
                    username_input.setAttribute('data-revert', account.username);
                    //Get display name
                    if (account.displayName !== null) {
                        displayName_input.value = account.displayName;
                        displayName_input.setAttribute('data-revert', account.displayName);
                    }
                    //Get email
                    email_input.value = account.email;
                    email_input.setAttribute('data-revert', account.email);

                    //Remove email confirm option if email is valid
                    if (account.emailValid) {
                        clone.querySelector('.email_confirm')!.remove();
                        //I will add an email verification system for email change after confirmation of email
                    }
                    //Get bio
                    if (account.selfDesc !== null) {
                        bio_input.value = account.selfDesc;
                        bio_input.setAttribute('data-revert', account.selfDesc);
                    }
                    //Get profile picture
                    if (account.profilePic !== null) {
                        profilePic_img.src = '/images/users/' + account.profilePic;
                        profilePic_img.setAttribute('data-revert', '/images/users/' + account.profilePic);
                    }

                    clone.querySelector('.as-savebtn')!.addEventListener('click', () => {
                        let profilePic = null;
                        // TODO: I will add an advanced profile picture uploader, with crops and all
                        // TODO: If hidden input is not empty, it means new image is uploaded

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
                        }

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
                                        displayName_input.setAttribute('data-revert', displayName)
                                    }
                                    if (selfDesc !== null) {
                                        bio_input.setAttribute('data-revert', selfDesc)
                                    }
                                    console.log("Success")
                                    // Show "Saved" message
                                } else {
                                    console.log("Fail")
                                    // Show "Failed" message
                                }
                            })
                        //.catch(err => { console.log('Update account failed -> ' + err) });
                    });

                    settingsbody.querySelectorAll('.pre_load').forEach(body => body.classList.remove('dflex'));
                    settingsbody.appendChild(clone);
                }
                else {
                    alert("Login to see here!");
                }
            })
        //.catch((err) => console.log('Account info could not be fetched -> ') + err)
    }
    function createBody_settings() {
        settingsbody.querySelectorAll('.pre_load').forEach(body => body.classList.remove('dflex'));
        settingsbody.querySelector('.s-settings_skel')!.classList.add('dflex');
    }
    function createBody_customize() {
        settingsbody.querySelectorAll('.pre_load').forEach(body => body.classList.remove('dflex'));
        settingsbody.querySelector('.s-customize_skel')!.classList.add('dflex');
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