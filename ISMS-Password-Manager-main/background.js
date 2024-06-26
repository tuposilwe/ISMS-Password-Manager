// chrome.runtime.onInstalled.addListener(() => {
//     console.log("Extension installed");
// });


chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ passwords: [], authenticated: false });
  });
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'authenticate') {
      chrome.storage.sync.set({ authenticated: true });
    }
  });

chrome.notifications.onClicked.addListener((notificationId) => {
    if (notificationId === "passwordSave8") {
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

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "generatePassword") {
      const newPassword = generateStrongPassword();
      sendResponse({ password: newPassword });
    } else if (request.action === "showPopup") {
      chrome.action.openPopup();
    }
  });
  
  function generateStrongPassword() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:',.<>?";
    let password = "";
    for (let i = 0; i < 16; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      password += chars[randomIndex];
    }
    return password;
  }


 
