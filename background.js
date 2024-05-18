chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed");
});

chrome.notifications.onClicked.addListener((notificationId) => {
    if (notificationId === "passwordSave1") {
        console.log("Password saved notification clicked");
    }
});


chrome.commands.onCommand.addListener((command) => {
    if (command === "autofill_credentials") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const activeTab = tabs[0];
            if (activeTab.url.includes("isms.iaa.ac.tz")) {
                chrome.scripting.executeScript({
                    target: { tabId: activeTab.id },
                    function: autofillCredentials
                });
            } else {
                console.log("Not on the ISMS page.");
            }
        });
    }
});

function autofillCredentials() {
    chrome.storage.local.get("userData", ({ userData }) => {
        if (userData) {
            const usernameInput = document.querySelector('input[type="text"]'); 
            const passwordInput = document.querySelector('input[type="password"]'); 

            if (usernameInput && passwordInput) {
                usernameInput.value = userData.username;
                passwordInput.value = userData.password;
                console.log("Credentials autofilled");
            } else {
                console.log("Username or password input fields not found.");
            }
        } else {
            console.log("No saved credentials found.");
        }
    });
}