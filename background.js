chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed");
});

chrome.notifications.onClicked.addListener((notificationId) => {
    if (notificationId === "passwordSave1") {
        console.log("Password saved notification clicked");
    }
});